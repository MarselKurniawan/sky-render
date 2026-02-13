import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Loader2, Copy, Search } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.storage.from("media").list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });
    if (error) { toast.error(error.message); setLoading(false); return; }
    const mapped = (data ?? [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl,
        created_at: f.created_at ?? "",
      }));
    setFiles(mapped);
    setLoading(false);
  }, []);

  useEffect(() => { fetchFiles(); }, [fetchFiles]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(fileName, file);
      if (error) toast.error(`Gagal upload ${file.name}: ${error.message}`);
    }
    setUploading(false);
    toast.success("Upload selesai!");
    fetchFiles();
    e.target.value = "";
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Hapus file ini?")) return;
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) { toast.error(error.message); return; }
    toast.success("File dihapus");
    fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL disalin!");
  };

  const filtered = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Media / Assets</h1>
        <label className="cursor-pointer">
          <input type="file" multiple accept="image/*,video/*,.pdf,.svg" className="hidden" onChange={handleUpload} />
          <Button asChild disabled={uploading} className="bg-electric hover:bg-electric/90">
            <span>{uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Upload size={16} className="mr-1" />} Upload</span>
          </Button>
        </label>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari file..." className="pl-9" />
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div>
      ) : filtered.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Belum ada media.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((f) => (
            <div key={f.name} className="group relative rounded-xl border border-border overflow-hidden bg-card">
              <div className="aspect-square bg-muted flex items-center justify-center overflow-hidden">
                <img src={f.url} alt={f.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="p-2">
                <p className="text-[10px] text-muted-foreground truncate">{f.name}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-7 w-7" onClick={() => copyUrl(f.url)}><Copy size={12} /></Button>
                <Button variant="destructive" size="icon" className="h-7 w-7" onClick={() => handleDelete(f.name)}><Trash2 size={12} /></Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMedia;
