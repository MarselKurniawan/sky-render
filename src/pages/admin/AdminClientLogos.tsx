import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Plus, Trash2, Loader2, GripVertical, ImageIcon } from "lucide-react";
import MediaPickerModal from "@/components/MediaPickerModal";

interface ClientLogo {
  id: string;
  name: string;
  image_url: string;
  display_order: number;
  is_active: boolean;
}

const AdminClientLogos = () => {
  const [logos, setLogos] = useState<ClientLogo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [newName, setNewName] = useState("");

  const fetchLogos = useCallback(async () => {
    setLoading(true);
    // Use rpc or raw query to bypass RLS for admin - but admin RLS should work
    const { data, error } = await supabase
      .from("client_logos")
      .select("*")
      .order("display_order", { ascending: true });
    if (error) toast.error(error.message);
    setLogos((data as ClientLogo[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchLogos(); }, [fetchLogos]);

  const handleAdd = (url: string, alt?: string) => {
    const name = newName.trim() || alt || "Client";
    const newLogo: ClientLogo = {
      id: crypto.randomUUID(),
      name,
      image_url: url,
      display_order: logos.length,
      is_active: true,
    };
    setLogos([...logos, newLogo]);
    setNewName("");
    // Save immediately
    saveLogo(newLogo);
  };

  const saveLogo = async (logo: ClientLogo) => {
    const { error } = await supabase.from("client_logos").insert({
      name: logo.name,
      image_url: logo.image_url,
      display_order: logo.display_order,
      is_active: logo.is_active,
    });
    if (error) toast.error(error.message);
    else toast.success(`Logo "${logo.name}" ditambahkan!`);
    fetchLogos();
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Hapus logo "${name}"?`)) return;
    const { error } = await supabase.from("client_logos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Logo dihapus");
      setLogos(logos.filter((l) => l.id !== id));
    }
  };

  const toggleActive = async (id: string, current: boolean) => {
    const { error } = await supabase
      .from("client_logos")
      .update({ is_active: !current })
      .eq("id", id);
    if (error) toast.error(error.message);
    else fetchLogos();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-primary">Logo Client</h1>
      </div>

      {/* Add new */}
      <div className="p-4 rounded-xl bg-card border border-border mb-6 space-y-3">
        <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
          <Plus size={14} /> Tambah Logo Client
        </h3>
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nama client (opsional)"
            className="flex-1"
          />
          <Button onClick={() => setShowPicker(true)} className="bg-electric hover:bg-electric/90 shrink-0">
            <ImageIcon size={16} className="mr-1" /> Pilih Logo dari Media
          </Button>
        </div>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-electric" size={24} />
        </div>
      ) : logos.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Belum ada logo client.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className={`group relative rounded-xl border overflow-hidden bg-card transition-all ${
                logo.is_active ? "border-border" : "border-destructive/30 opacity-60"
              }`}
            >
              <div className="aspect-[3/2] bg-muted flex items-center justify-center p-4">
                <img
                  src={logo.image_url}
                  alt={logo.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-2 space-y-1">
                <p className="text-xs font-medium text-primary truncate">{logo.name}</p>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 text-[10px] px-2"
                    onClick={() => toggleActive(logo.id, logo.is_active)}
                  >
                    {logo.is_active ? "Aktif ✓" : "Nonaktif"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 text-destructive hover:text-destructive ml-auto"
                    onClick={() => handleDelete(logo.id, logo.name)}
                  >
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <MediaPickerModal
        open={showPicker}
        onOpenChange={setShowPicker}
        onSelect={handleAdd}
      />
    </div>
  );
};

export default AdminClientLogos;
