import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, Megaphone } from "lucide-react";

interface Banner {
  id: string;
  title: string;
  description: string | null;
  cta_text: string | null;
  cta_url: string | null;
  badge_text: string | null;
  is_active: boolean;
  display_order: number;
}

const emptyForm = {
  title: "",
  description: "",
  cta_text: "Klaim Sekarang",
  cta_url: "",
  badge_text: "🔥 Promo",
  is_active: true,
  display_order: 0,
};

const AdminBanners = () => {
  const [items, setItems] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("promo_banners")
      .select("*")
      .order("display_order");
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (b: Banner) => {
    setForm({
      title: b.title,
      description: b.description ?? "",
      cta_text: b.cta_text ?? "Klaim Sekarang",
      cta_url: b.cta_url ?? "",
      badge_text: b.badge_text ?? "🔥 Promo",
      is_active: b.is_active,
      display_order: b.display_order,
    });
    setEditing(b.id);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast.error("Judul wajib diisi"); return; }
    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description || null,
      cta_text: form.cta_text || null,
      cta_url: form.cta_url || null,
      badge_text: form.badge_text || null,
      is_active: form.is_active,
      display_order: form.display_order,
    };
    const { error } = editing
      ? await supabase.from("promo_banners").update(payload).eq("id", editing)
      : await supabase.from("promo_banners").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Banner diupdate!" : "Banner dibuat!");
    setOpen(false);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus banner ini?")) return;
    await supabase.from("promo_banners").delete().eq("id", id);
    toast.success("Banner dihapus");
    fetchData();
  };

  const setField = (key: string, value: any) => setForm(f => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Banner Promo</h1>
        <Button onClick={openNew} className="bg-electric hover:bg-electric/90">
          <Plus size={16} className="mr-1" /> Tambah Banner
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="animate-spin text-electric" size={24} />
        </div>
      ) : items.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Belum ada banner promo.</p>
      ) : (
        <div className="space-y-3">
          {items.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="w-10 h-10 rounded-lg bg-electric/10 flex items-center justify-center shrink-0">
                <Megaphone size={18} className="text-electric" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${b.is_active ? "text-emerald-500" : "text-muted-foreground"}`}>
                    {b.is_active ? "Active" : "Hidden"}
                  </span>
                </div>
                <h3 className="font-semibold text-sm text-primary truncate">{b.title}</h3>
                <p className="text-xs text-muted-foreground truncate">{b.description}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(b)}>
                <Pencil size={16} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(b.id)} className="text-destructive">
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Banner" : "Tambah Banner"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Judul / Headline</Label>
              <Input value={form.title} onChange={e => setField("title", e.target.value)} placeholder="Diskon 20% Paket Website" />
            </div>
            <div>
              <Label>Deskripsi</Label>
              <Input value={form.description} onChange={e => setField("description", e.target.value)} placeholder="Berlaku hingga akhir bulan" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Badge Text</Label>
                <Input value={form.badge_text} onChange={e => setField("badge_text", e.target.value)} placeholder="🔥 Promo" />
              </div>
              <div>
                <Label>CTA Text</Label>
                <Input value={form.cta_text} onChange={e => setField("cta_text", e.target.value)} placeholder="Klaim Sekarang" />
              </div>
            </div>
            <div>
              <Label>CTA URL (WhatsApp / Link)</Label>
              <Input value={form.cta_url} onChange={e => setField("cta_url", e.target.value)} placeholder="https://wa.me/6285117688118?text=..." />
            </div>
            <div>
              <Label>Display Order</Label>
              <Input type="number" value={form.display_order} onChange={e => setField("display_order", parseInt(e.target.value) || 0)} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={form.is_active} onCheckedChange={v => setField("is_active", v)} />
              <Label>Active (tampilkan)</Label>
            </div>

            {/* Preview */}
            <div className="border-t border-border pt-4">
              <p className="text-xs font-semibold text-muted-foreground mb-2">Preview:</p>
              <div className="relative rounded-xl overflow-hidden bg-navy p-5">
                <div className="absolute inset-0 opacity-[0.04]" style={{
                  backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }} />
                <div className="relative z-10">
                  {form.badge_text && (
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-[0.2em] px-2.5 py-0.5 rounded-full mb-2 bg-primary-foreground text-navy">
                      {form.badge_text}
                    </span>
                  )}
                  <h3 className="text-base font-extrabold text-primary-foreground mb-1">{form.title || "Judul Banner"}</h3>
                  {form.description && <p className="text-xs text-primary-foreground/60">{form.description}</p>}
                </div>
              </div>
            </div>

            <Button onClick={handleSave} disabled={saving} className="w-full bg-electric hover:bg-electric/90">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}
              {editing ? "Update" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBanners;
