import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, Trash2, Loader2, Copy, Search, ImageIcon, Check } from "lucide-react";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  alt_text: string;
}

const AdminMedia = () => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState("");
  const [editingAlt, setEditingAlt] = useState<string | null>(null);
  const [altValue, setAltValue] = useState("");
  const [uploadAlt, setUploadAlt] = useState("");

  const fetchFiles = useCallback(async () => {
    setLoading(true);
    const [{ data: storageData, error }, { data: metaData }] = await Promise.all([
      supabase.storage.from("media").list("", {
        limit: 500,
        sortBy: { column: "created_at", order: "desc" },
      }),
      supabase.from("media_metadata").select("file_name, alt_text"),
    ]);
    if (error) { toast.error(error.message); setLoading(false); return; }

    const altMap = new Map((metaData ?? []).map(m => [m.file_name, m.alt_text ?? ""]));

    const mapped = (storageData ?? [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl,
        created_at: f.created_at ?? "",
        alt_text: altMap.get(f.name) ?? "",
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
      if (error) { toast.error(`Gagal upload ${file.name}: ${error.message}`); continue; }
      // Save ALT text if provided
      if (uploadAlt.trim()) {
        await supabase.from("media_metadata").upsert({ file_name: fileName, alt_text: uploadAlt.trim() }, { onConflict: "file_name" });
      }
    }
    setUploading(false);
    setUploadAlt("");
    toast.success("Upload selesai!");
    fetchFiles();
    e.target.value = "";
  };

  const handleDelete = async (name: string) => {
    if (!confirm("Hapus file ini?")) return;
    const { error } = await supabase.storage.from("media").remove([name]);
    if (error) { toast.error(error.message); return; }
    await supabase.from("media_metadata").delete().eq("file_name", name);
    toast.success("File dihapus");
    fetchFiles();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL disalin!");
  };

  const startEditAlt = (file: MediaFile) => {
    setEditingAlt(file.name);
    setAltValue(file.alt_text);
  };

  const saveAlt = async (fileName: string) => {
    await supabase.from("media_metadata").upsert(
      { file_name: fileName, alt_text: altValue.trim() || null },
      { onConflict: "file_name" }
    );
    setEditingAlt(null);
    toast.success("ALT text disimpan!");
    fetchFiles();
  };

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.alt_text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Media / Assets</h1>
      </div>

      {/* Upload area with ALT input */}
      <div className="p-4 rounded-xl bg-card border border-border mb-4 space-y-3">
        <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
          <Upload size={14} /> Upload Media Baru
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={uploadAlt}
            onChange={(e) => setUploadAlt(e.target.value)}
            placeholder="ALT text untuk foto (opsional, tapi direkomendasikan untuk SEO)"
            className="flex-1"
          />
          <label className="cursor-pointer shrink-0">
            <input type="file" multiple accept="image/*,video/*,.pdf,.svg" className="hidden" onChange={handleUpload} />
            <Button asChild disabled={uploading} className="bg-electric hover:bg-electric/90">
              <span>{uploading ? <Loader2 className="animate-spin mr-2" size={16} /> : <Upload size={16} className="mr-1" />} Pilih & Upload</span>
            </Button>
          </label>
        </div>
      </div>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari file atau ALT text..." className="pl-9" />
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
                <img src={f.url} alt={f.alt_text || f.name} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
              </div>
              <div className="p-2 space-y-1">
                <p className="text-[10px] text-muted-foreground truncate">{f.name}</p>
                {editingAlt === f.name ? (
                  <div className="flex gap-1">
                    <Input
                      value={altValue}
                      onChange={(e) => setAltValue(e.target.value)}
                      placeholder="ALT text..."
                      className="h-6 text-[10px] px-1.5"
                      onKeyDown={(e) => e.key === "Enter" && saveAlt(f.name)}
                      autoFocus
                    />
                    <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => saveAlt(f.name)}>
                      <Check size={10} />
                    </Button>
                  </div>
                ) : (
                  <button
                    onClick={() => startEditAlt(f)}
                    className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-electric transition-colors w-full text-left"
                  >
                    <ImageIcon size={10} className="shrink-0" />
                    <span className="truncate">{f.alt_text || "Tambah ALT text..."}</span>
                  </button>
                )}
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
