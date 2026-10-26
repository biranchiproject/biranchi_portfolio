import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Edit2, Upload, ExternalLink, Github, LogOut, ArrowLeft, Mail, MailOpen, Reply, Inbox } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import AdminDesignToggle from "@/components/AdminDesignToggle";
import AdminAnimationToggle from "@/components/AdminAnimationToggle";

type Project = {
    id: string;
    title: string;
    description: string;
    live_link: string;
    github_link: string;
    image_url: string;
    created_at?: string;
};

type Achievement = {
    id: string;
    title: string;
    image_url: string;
    created_at?: string;
};

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    message: string;
    is_read: boolean;
    created_at: string;
};

const getErrorMessage = (error: unknown, fallback: string) =>
    error instanceof Error && error.message ? error.message : fallback;

const AdminDashboard = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [cvData, setCvData] = useState<{id: string, file_url: string} | null>(null);
    const [profilePhotoData, setProfilePhotoData] = useState<{id: string, file_url: string} | null>(null);
    const [isAddingProject, setIsAddingProject] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [newProject, setNewProject] = useState({
        title: "",
        description: "",
        live_link: "",
        github_link: "",
        image_url: ""
    });
    const [isUploadingImage, setIsUploadingImage] = useState(false);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isUploadingAchievement, setIsUploadingAchievement] = useState(false);
    const [localPreview, setLocalPreview] = useState<string | null>(null);
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

    useEffect(() => {
        if (!isLoggedIn) {
            navigate("/");
            toast.error("Please login to access admin dashboard");
        } else {
            fetchProjects();
            fetchCv();
            fetchProfilePhoto();
            fetchAchievements();
            fetchMessages();

            // Live polling for real-time feel
            const interval = setInterval(() => {
                fetchProjects();
                fetchCv();
                fetchProfilePhoto();
                fetchAchievements();
                fetchMessages();
            }, 10000); // Poll every 10 seconds
            
            return () => clearInterval(interval);
        }
    }, [isLoggedIn, navigate]);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase.from("projects").select("*");
            if (error) throw error;
            setProjects(data || []);
        } catch (error) {
            console.error("Fetch projects error:", error);
        }
    };

    const fetchCv = async () => {
        try {
            const { data, error } = await supabase.from("cv").select("id, file_url").order("created_at", { ascending: false }).limit(1).single();
            if (error && error.code !== "PGRST116") throw error;
            if (data?.id && data?.file_url) setCvData(data);
            else setCvData(null);
        } catch (error) {
            console.error("Fetch CV error:", error);
        }
    };

    const fetchProfilePhoto = async () => {
        try {
            const { data, error } = await supabase.from("profile_photo").select("id, file_url").order("created_at", { ascending: false }).limit(1).single();
            if (error && error.code !== "PGRST116") throw error;
            if (data?.id && data?.file_url) setProfilePhotoData(data);
            else setProfilePhotoData(null);
        } catch (error) {
            console.error("Fetch Profile Photo error:", error);
        }
    };

    const fetchAchievements = async () => {
        try {
            const { data, error } = await supabase.from("achievements").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setAchievements(data || []);
        } catch (error) {
            console.error("Fetch achievements error:", error);
        }
    };

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase.from("contact_messages").select("*").order("created_at", { ascending: false });
            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error("Fetch messages error:", error);
        }
    };

    const handleToggleMessageRead = async (message: ContactMessage) => {
        try {
            const { error } = await supabase.from("contact_messages").update({ is_read: !message.is_read }).eq("id", message.id);
            if (error) throw error;
            fetchMessages();
        } catch (error) {
            console.error("Update message error:", error);
            toast.error("Failed to update message");
        }
    };

    const handleDeleteMessage = async (id: string) => {
        if (!confirm("Delete this message permanently?")) return;
        try {
            const { error } = await supabase.from("contact_messages").delete().eq("id", id);
            if (error) throw error;
            toast.success("Message deleted");
            fetchMessages();
        } catch (error) {
            console.error("Delete message error:", error);
            toast.error("Failed to delete message");
        }
    };

    const unreadCount = messages.filter((message) => !message.is_read).length;

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        navigate("/");
        toast.info("Logged out");
    };

    const handleAddProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { error } = await supabase.from("projects").insert([newProject]);
            if (error) throw error;
            toast.success("Project added!");
            setIsAddingProject(false);
            setNewProject({ title: "", description: "", live_link: "", github_link: "", image_url: "" });
            fetchProjects();
        } catch (error) {
            toast.error("Failed to add project");
        }
    };

    const handleUpdateProject = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { id, created_at, ...updateData } = editingProject;
            const { error } = await supabase.from("projects").update(updateData).eq("id", id);
            if (error) throw error;
            toast.success("Project Updated Successfully!");
            setEditingProject(null);
            setLocalPreview(null);
            fetchProjects();
        } catch (error) {
            toast.error(`Error: ${getErrorMessage(error, "Failed to update project")}`);
        }
    };

    const handleDeleteProject = async (id: string) => {
        if (!confirm("Are you sure you want to delete this project?")) return;
        try {
            const { error } = await supabase.from("projects").delete().eq("id", id);
            if (error) throw error;
            toast.success("Project deleted");
            fetchProjects();
        } catch (error) {
            toast.error("Failed to delete project");
        }
    };

    const handleCvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const file_path = `cv/${file.name}`;
            const { error: uploadError } = await supabase.storage.from("cv-files").upload(file_path, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("cv-files").getPublicUrl(file_path);
            
            const { error: dbError } = await supabase.from("cv").insert({ file_url: data.publicUrl });
            if (dbError) throw dbError;

            fetchCv();
            toast.success("CV uploaded successfully!");
        } catch (error) {
            console.error("CV Upload Error:", error);
            toast.error(getErrorMessage(error, "Failed to upload CV"));
        }
    };

    const handleDeleteCv = async () => {
        if (!cvData?.id || !confirm("Are you sure you want to delete the current CV?")) return;
        try {
            const file_name = cvData.file_url.split("/").pop();
            if (file_name) {
                await supabase.storage.from("cv-files").remove([`cv/${file_name}`]);
            }
            
            const { error } = await supabase.from("cv").delete().eq("id", cvData.id);
            if (error) throw error;
            
            setCvData(null);
            toast.success("CV deleted successfully");
        } catch (error) {
            console.error("Delete CV error:", error);
            toast.error("Error deleting CV");
        }
    };

    const handleProfilePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            const file_path = `profile/${file.name}`;
            const { error: uploadError } = await supabase.storage.from("profile-images").upload(file_path, file, { upsert: true });
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from("profile-images").getPublicUrl(file_path);
            
            // Remove old entries to keep only one active
            await supabase.from("profile_photo").delete().neq("id", "00000000-0000-0000-0000-000000000000");

            const { error: dbError } = await supabase.from("profile_photo").insert({ file_url: data.publicUrl });
            if (dbError) throw dbError;

            fetchProfilePhoto();
            toast.success("Profile Photo updated successfully!");
        } catch (error) {
            console.error("Profile Photo Upload Error:", error);
            toast.error(getErrorMessage(error, "Failed to upload Profile Photo"));
        }
    };

    const handleDeleteProfilePhoto = async () => {
        if (!profilePhotoData?.id || !confirm("Are you sure you want to delete the current profile photo?")) return;
        try {
            const file_name = profilePhotoData.file_url.split("/").pop();
            if (file_name) {
                await supabase.storage.from("profile-images").remove([`profile/${file_name}`]);
            }

            const { error } = await supabase.from("profile_photo").delete().eq("id", profilePhotoData.id);
            if (error) throw error;
            
            setProfilePhotoData(null);
            toast.success("Profile photo deleted successfully");
        } catch (error) {
            console.error("Delete profile photo error:", error);
            toast.error("Error deleting profile photo");
        }
    };

    const handleProjectImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        setLocalPreview(preview);
        setIsUploadingImage(true);

        try {
            const file_name = `projects/${file.name}`;
            const { error: uploadError } = await supabase.storage.from("project-images").upload(file_name, file, { upsert: true });
            if (uploadError) throw uploadError;
            
            const { data } = supabase.storage.from("project-images").getPublicUrl(file_name);
            
            if (editingProject) {
                setEditingProject({ ...editingProject, image_url: data.publicUrl });
            } else {
                setNewProject({ ...newProject, image_url: data.publicUrl });
            }
            toast.success("Image uploaded to server!");
        } catch (error) {
            toast.error("Failed to upload image");
        } finally {
            setIsUploadingImage(false);
        }
    };

    const handleAchievementUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploadingAchievement(true);
        try {
            const file_path = `certificates/${Date.now()}_${file.name}`;
            const { error: uploadError } = await supabase.storage.from("certificates").upload(file_path, file);
            if (uploadError) throw uploadError;

            const { data: urlData } = supabase.storage.from("certificates").getPublicUrl(file_path);
            
            const { error: dbError } = await supabase.from("achievements").insert({
                title: file.name.split('.')[0].replace(/[-_]/g, ' '),
                image_url: urlData.publicUrl
            });
            if (dbError) throw dbError;

            fetchAchievements();
            toast.success("Achievement uploaded successfully!");
        } catch (error) {
            console.error("Achievement Upload Error:", error);
            toast.error(getErrorMessage(error, "Failed to upload achievement"));
        } finally {
            setIsUploadingAchievement(false);
        }
    };

    const handleDeleteAchievement = async (id: string, imageUrl: string) => {
        if (!confirm("Are you sure you want to delete this achievement?")) return;
        try {
            // Extract file path from URL
            const urlParts = imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1];
            
            await supabase.storage.from("certificates").remove([fileName]);
            
            const { error } = await supabase.from("achievements").delete().eq("id", id);
            if (error) throw error;

            fetchAchievements();
            toast.success("Achievement deleted");
        } catch (error) {
            console.error("Delete achievement error:", error);
            toast.error("Error deleting achievement");
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 md:p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-8 md:mb-12">
                     <div className="flex items-center gap-2 sm:gap-4">
                        <Button variant="ghost" onClick={() => navigate("/")} className="text-gray-text hover:text-neon-green px-2 sm:px-4">
                            <ArrowLeft className="w-5 h-5 sm:mr-2" /> <span className="hidden sm:inline">Back</span>
                        </Button>
                        <h1 className="!text-2xl sm:!text-3xl md:!text-4xl font-bold font-tech text-neon-green">Admin <span className="text-foreground">Dashboard</span></h1>
                    </div>
                    <Button variant="destructive" onClick={handleLogout} className="flex items-center">
                        <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                </div>

                <AdminDesignToggle />
                <AdminAnimationToggle />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* CV Management */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-1">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Files & Profile</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            {/* Profile Photo Section */}
                            <div className="p-4 border-2 border-dark-border rounded-xl bg-dark-bg/50">
                                <h4 className="text-sm font-bold text-neon-green mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-neon-green rounded-full mr-2"></span>
                                    Profile Photo
                                </h4>
                                {profilePhotoData ? (
                                    <div className="space-y-4">
                                        <div className="flex justify-center">
                                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-neon-green/30">
                                                <img src={profilePhotoData.file_url} alt="Profile" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 h-8 text-xs" onClick={handleDeleteProfilePhoto}>
                                                <Trash2 className="w-3 h-3 mr-2" /> Remove Image
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-gray-text text-center mb-4 italic">Using default system photo</p>
                                )}
                                <label className="cursor-pointer group block mt-2">
                                    <div className="flex items-center justify-center space-x-2 py-2 bg-neon-green/10 text-neon-green border border-dashed border-neon-green/30 rounded-lg group-hover:bg-neon-green/20 transition-all">
                                        <Upload className="w-4 h-4" />
                                        <span className="text-xs font-bold">{profilePhotoData ? "Replace Photo" : "Upload New Photo"}</span>
                                    </div>
                                    <input type="file" className="hidden" accept="image/*" onChange={handleProfilePhotoUpload} />
                                </label>
                            </div>

                            {/* CV Section */}
                            <div className="p-4 border-2 border-dark-border rounded-xl bg-dark-bg/50">
                                <h4 className="text-sm font-bold text-neon-green mb-4 flex items-center">
                                    <span className="w-2 h-2 bg-neon-green rounded-full mr-2"></span>
                                    CV (Resumé)
                                </h4>
                                {cvData ? (
                                    <div className="space-y-4">
                                        <Button className="w-full bg-neon-green/10 text-neon-green hover:bg-neon-green/20 h-10" onClick={() => window.open(cvData.file_url, "_blank")}>
                                            View Current CV
                                        </Button>
                                        <Button variant="outline" className="w-full border-destructive/30 text-destructive hover:bg-destructive/10 h-8 text-xs" onClick={handleDeleteCv}>
                                            <Trash2 className="w-3 h-3 mr-2" /> Delete CV
                                        </Button>
                                    </div>
                                ) : (
                                    <p className="text-[10px] text-gray-text text-center mb-4 italic">No resume uploaded</p>
                                )}
                                <label className="cursor-pointer group block mt-4">
                                    <div className="flex items-center justify-center space-x-2 py-3 bg-dark-surface border border-dashed border-dark-border rounded-lg group-hover:border-neon-green/50 transition-all">
                                        <Upload className="w-5 h-5 text-gray-text/50 group-hover:text-neon-green" />
                                        <span className="text-xs font-semibold text-gray-text group-hover:text-neon-green">{cvData ? "Replace CV" : "Upload CV File"}</span>
                                    </div>
                                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleCvUpload} />
                                </label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Project Management */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="text-xl font-bold">Project Management</CardTitle>
                            <Button onClick={() => setIsAddingProject(true)} className="bg-neon-green text-dark-bg hover:shadow-neon font-semibold">
                                <Plus className="w-4 h-4 mr-2" /> Add Project
                            </Button>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {(isAddingProject || editingProject) && (
                                <div className="bg-dark-bg p-6 rounded-2xl border border-neon-green/30 space-y-4 animate-in fade-in slide-in-from-top-4">
                                    <h3 className="text-lg font-bold text-neon-green">{editingProject ? "Edit Project" : "New Project"}</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm text-gray-text">Title</label>
                                            <Input
                                                value={editingProject ? editingProject.title : newProject.title}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, title: e.target.value}) : setNewProject({...newProject, title: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2 col-span-2">
                                            <label className="text-sm text-gray-text">Description</label>
                                            <Textarea
                                                value={editingProject ? editingProject.description : newProject.description}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, description: e.target.value}) : setNewProject({...newProject, description: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-text">Live Link</label>
                                            <Input
                                                value={editingProject ? editingProject.live_link : newProject.live_link}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, live_link: e.target.value}) : setNewProject({...newProject, live_link: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm text-gray-text">GitHub Link</label>
                                            <Input
                                                value={editingProject ? editingProject.github_link : newProject.github_link}
                                                onChange={(e) => editingProject ? setEditingProject({...editingProject, github_link: e.target.value}) : setNewProject({...newProject, github_link: e.target.value})}
                                                className="bg-dark-surface border-dark-border"
                                            />
                                        </div>
                                        <div className="space-y-4 col-span-2 mt-4">
                                            <div className="flex flex-col space-y-2">
                                                <label className="text-sm font-semibold text-neon-green/80 uppercase tracking-wider">Project Demo Preview</label>
                                                <div className="relative group overflow-hidden rounded-xl border-2 border-dark-border bg-dark-bg aspect-video flex items-center justify-center">
                                                    {(localPreview || editingProject?.image_url || newProject.image_url) ? (
                                                        <img 
                                                            src={localPreview || editingProject?.image_url || newProject.image_url} 
                                                            alt="Preview" 
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="text-center p-8">
                                                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-surface flex items-center justify-center border border-dashed border-dark-border">
                                                                <Upload className="w-8 h-8 text-gray-text/40" />
                                                            </div>
                                                            <p className="text-sm text-gray-text">No image selected</p>
                                                        </div>
                                                    )}
                                                    
                                                    {isUploadingImage && (
                                                        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm flex flex-col items-center justify-center">
                                                            <div className="w-8 h-8 border-4 border-neon-green border-t-transparent rounded-full animate-spin mb-2"></div>
                                                            <p className="text-xs font-bold text-neon-green">UPLOADING...</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            
                                            <div className="relative">
                                                <label className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-neon-green/5 hover:bg-neon-green/10 border-2 border-dashed border-neon-green/30 hover:border-neon-green/60 rounded-xl cursor-pointer transition-all group">
                                                    <Upload className="w-5 h-5 text-neon-green group-hover:scale-110 transition-transform" />
                                                    <span className="text-sm font-semibold text-neon-green">{editingProject?.image_url || newProject.image_url ? "Change Image" : "Select Project Image"}</span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleProjectImageUpload}
                                                        disabled={isUploadingImage}
                                                        className="hidden"
                                                    />
                                                </label>
                                                {isUploadingImage && <p className="text-[10px] text-neon-green/60 text-center mt-2 animate-pulse font-mono tracking-tighter">SECURING DATA PIPELINE...</p>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-2">
                                        <Button 
                                            onClick={editingProject ? handleUpdateProject : handleAddProject} 
                                            className="flex-1 bg-neon-green text-dark-bg font-bold shadow-neon-strong hover:scale-[1.02] transition-transform"
                                            disabled={isUploadingImage}
                                        >
                                            {isUploadingImage ? "Wait..." : (editingProject ? "Update Project" : "Create Project")}
                                        </Button>
                                        <Button variant="outline" onClick={() => { setIsAddingProject(false); setEditingProject(null); }} className="flex-1 border-dark-border">
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {projects.map((project) => (
                                    <div key={project.id} className="p-4 bg-dark-bg rounded-xl border border-dark-border flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h4 className="font-bold text-foreground">{project.title}</h4>
                                                <div className="flex gap-2">
                                                    <button onClick={() => setEditingProject(project)} className="text-gray-text hover:text-neon-green transition-colors"><Edit2 className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteProject(project.id)} className="text-gray-text hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-text line-clamp-2 mb-4">{project.description}</p>
                                        </div>
                                        <div className="flex gap-4">
                                             <a href={project.live_link} target="_blank" className="text-xs text-neon-green flex items-center hover:underline"><ExternalLink className="w-3 h-3 mr-1" /> Live</a>
                                             <a href={project.github_link} target="_blank" className="text-xs text-gray-text flex items-center hover:underline"><Github className="w-3 h-3 mr-1" /> Repo</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Contact Messages */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold flex items-center gap-3">
                                    <Inbox className="w-5 h-5 text-neon-green" />
                                    Contact Messages
                                    {unreadCount > 0 && (
                                        <span className="px-2.5 py-0.5 rounded-full bg-neon-green text-dark-bg text-xs font-bold">
                                            {unreadCount} new
                                        </span>
                                    )}
                                </CardTitle>
                                <p className="text-xs text-gray-text mt-1">
                                    Messages sent from the contact form on your website
                                </p>
                            </div>
                            <span className="text-xs text-gray-text">
                                {messages.length} total
                            </span>
                        </CardHeader>
                        <CardContent>
                            {messages.length > 0 ? (
                                <div className="space-y-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`p-5 rounded-xl border transition-all ${
                                                message.is_read
                                                    ? "bg-dark-bg border-dark-border"
                                                    : "bg-neon-green/5 border-neon-green/30"
                                            }`}
                                        >
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 mb-3">
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 flex-wrap">
                                                        {!message.is_read && (
                                                            <span className="w-2 h-2 rounded-full bg-neon-green flex-shrink-0"></span>
                                                        )}
                                                        <h4 className="font-bold text-foreground">{message.name}</h4>
                                                        <a
                                                            href={`mailto:${message.email}`}
                                                            className="text-xs text-neon-green hover:underline break-all"
                                                        >
                                                            {message.email}
                                                        </a>
                                                    </div>
                                                    <p className="text-[11px] text-gray-text mt-1">
                                                        {new Date(message.created_at).toLocaleString()}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <button
                                                        onClick={() => handleToggleMessageRead(message)}
                                                        title={message.is_read ? "Mark as unread" : "Mark as read"}
                                                        className="p-2 rounded-lg border border-dark-border text-gray-text hover:text-neon-green hover:border-neon-green/40 transition-all"
                                                    >
                                                        {message.is_read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                                                    </button>
                                                    <a
                                                        href={`mailto:${message.email}?subject=Re: your message&body=Hi ${message.name},%0D%0A%0D%0A`}
                                                        title="Reply by email"
                                                        className="p-2 rounded-lg border border-dark-border text-gray-text hover:text-neon-green hover:border-neon-green/40 transition-all"
                                                    >
                                                        <Reply className="w-4 h-4" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleDeleteMessage(message.id)}
                                                        title="Delete message"
                                                        className="p-2 rounded-lg border border-dark-border text-gray-text hover:text-destructive hover:border-destructive/40 transition-all"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            <p className="text-sm text-gray-text leading-relaxed whitespace-pre-wrap break-words">
                                                {message.message}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-dark-border rounded-xl">
                                    <Inbox className="w-10 h-10 text-gray-text/30 mx-auto mb-3" />
                                    <p className="text-sm text-gray-text italic">No messages yet — they will appear here instantly.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Achievements Management */}
                    <Card className="bg-dark-surface border-dark-border lg:col-span-3">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl font-bold">Achievements & Certifications</CardTitle>
                                <p className="text-xs text-gray-text mt-1">Manage your professional milestones</p>
                            </div>
                            <label className="cursor-pointer group">
                                <div className="flex items-center space-x-2 px-4 py-2 bg-neon-green text-dark-bg rounded-lg font-bold hover:shadow-neon transition-all">
                                    {isUploadingAchievement ? (
                                        <div className="w-4 h-4 border-2 border-dark-bg border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <Plus className="w-4 h-4" />
                                    )}
                                    <span>{isUploadingAchievement ? "Uploading..." : "Upload Certificate"}</span>
                                </div>
                                <input 
                                    type="file" 
                                    className="hidden" 
                                    accept="image/*" 
                                    onChange={handleAchievementUpload}
                                    disabled={isUploadingAchievement}
                                />
                            </label>
                        </CardHeader>
                        <CardContent>
                            {achievements.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {achievements.map((achievement) => (
                                        <div key={achievement.id} className="group relative aspect-square bg-dark-bg rounded-lg overflow-hidden border border-dark-border">
                                            <img 
                                                src={achievement.image_url} 
                                                alt={achievement.title} 
                                                className="w-full h-full object-cover transition-transform group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button 
                                                    onClick={() => handleDeleteAchievement(achievement.id, achievement.image_url)}
                                                    className="p-2 bg-destructive/20 text-destructive border border-destructive/40 rounded-full hover:bg-destructive hover:text-white transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-1 bg-dark-bg/80 backdrop-blur-sm text-[10px] text-center truncate">
                                                {achievement.title}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-12 border-2 border-dashed border-dark-border rounded-xl">
                                    <p className="text-sm text-gray-text italic">No certificates found in digital vaults...</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
