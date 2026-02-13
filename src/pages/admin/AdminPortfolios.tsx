import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";
import MediaPickerModal from "@/components/MediaPickerModal";

interface Portfolio {
  id: string; title: string; category: string; price: string | null;
  image_url: string | null; display_order: number; is_published: boolean;
}

interface ServiceOption { id: string; title: string; }

const emptyForm = { title: "", category: "", price: "", image_url: "", display_order: 0, is_published: true };

const AdminPortfolios = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [services, setServices] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [mediaPicker, setMediaPicker] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const [{ data: portfolios }, { data: svc }] = await Promise.all([
      supabase.from("portfolios").select("*").order("display_order"),
      supabase.from("services").select("id, title").eq("is_published", true).order("display_order"),
    ]);
    setItems(portfolios ?? []);
    setServices(svc ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (p: Portfolio) => {
    setForm({ title: p.title, category: p.category, price: (p as any).price ?? "", image_url: p.image_url ?? "", display_order: p.display_order, is_published: p.is_published });
    setEditing(p.id); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.category) { toast.error("Title dan kategori wajib diisi"); return; }
    setSaving(true);
    const payload: any = {
      title: form.title, category: form.category, price: form.price || null,
      image_url: form.image_url || null, display_order: form.display_order, is_published: form.is_published,
    };
    const { error } = editing ? await supabase.from("portfolios").update(payload).eq("id", editing) : await supabase.from("portfolios").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Portfolio diupdate!" : "Portfolio dibuat!");
    setOpen(false); fetchData();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus portfolio ini?")) return;
    await supabase.from("portfolios").delete().eq("id", id);
    toast.success("Portfolio dihapus"); fetchData();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Portfolio</h1>
        <Button onClick={openNew} className="bg-electric hover:bg-electric/90"><Plus size={16} className="mr-1" /> Tambah</Button>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div> : items.length === 0 ? <p className="text-muted-foreground text-center py-12">Belum ada portfolio.</p> : (
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              {p.image_url ? (
                <img src={p.image_url} alt={p.title} className="w-12 h-12 rounded-lg object-cover shrink-0" />
              ) : (
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0"><ImageIcon size={18} className="text-muted-foreground" /></div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-primary truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.category} {(p as any).price ? `· ${(p as any).price}` : ""}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(p)}><Pencil size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(p.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit Portfolio" : "Tambah Portfolio"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Judul</Label><Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div>
              <Label>Kategori (dari Layanan)</Label>
              <Select value={form.category} onValueChange={(v) => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue placeholder="Pilih kategori" /></SelectTrigger>
                <SelectContent className="bg-card">
                  {services.map(s => <SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Harga</Label><Input value={form.price} onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))} placeholder="Rp 5.000.000" /></div>
            <div>
              <Label>Foto</Label>
              <div className="flex gap-2 items-center">
                {form.image_url && <img src={form.image_url} alt="" className="w-16 h-16 rounded-lg object-cover" />}
                <Button type="button" variant="outline" onClick={() => setMediaPicker(true)}>
                  <ImageIcon size={14} className="mr-1" /> Pilih dari Media
                </Button>
              </div>
            </div>
            <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={(v) => setForm(f => ({ ...f, is_published: v }))} /><Label>Published</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-electric hover:bg-electric/90">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}{editing ? "Update" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <MediaPickerModal open={mediaPicker} onOpenChange={setMediaPicker} onSelect={(url) => setForm(f => ({ ...f, image_url: url }))} />
    </div>
  );
};

export default AdminPortfolios;
