import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Search, Upload } from "lucide-react";
import { toast } from "sonner";

interface MediaPickerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (url: string) => void;
}

interface MediaFile {
  name: string;
  url: string;
}

const MediaPickerModal = ({ open, onOpenChange, onSelect }: MediaPickerModalProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);

  const fetchFiles = async () => {
    setLoading(true);
    const { data } = await supabase.storage.from("media").list("", {
      limit: 500,
      sortBy: { column: "created_at", order: "desc" },
    });
    const mapped = (data ?? [])
      .filter((f) => f.name !== ".emptyFolderPlaceholder")
      .map((f) => ({
        name: f.name,
        url: supabase.storage.from("media").getPublicUrl(f.name).data.publicUrl,
      }));
    setFiles(mapped);
    setLoading(false);
  };

  useEffect(() => {
    if (open) fetchFiles();
  }, [open]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    for (const file of Array.from(fileList)) {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("media").upload(fileName, file);
      if (error) toast.error(error.message);
    }
    setUploading(false);
    fetchFiles();
  };

  const filtered = files.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Pilih Media</DialogTitle>
        </DialogHeader>
        <div className="flex gap-2 mb-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Cari..." className="pl-9" />
          </div>
          <label className="cursor-pointer">
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} />
            <Button asChild variant="outline" disabled={uploading}>
              <span>{uploading ? <Loader2 className="animate-spin mr-1" size={14} /> : <Upload size={14} className="mr-1" />} Upload</span>
            </Button>
          </label>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div>
          ) : filtered.length === 0 ? (
            <p className="text-muted-foreground text-center py-12 text-sm">Belum ada media. Upload dulu.</p>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((f) => (
                <button
                  key={f.name}
                  type="button"
                  className="aspect-square rounded-lg border-2 border-transparent hover:border-electric overflow-hidden bg-muted transition-all focus:border-electric focus:outline-none"
                  onClick={() => { onSelect(f.url); onOpenChange(false); }}
                >
                  <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPickerModal;
