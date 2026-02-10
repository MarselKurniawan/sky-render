import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Portfolio {
  id: string;
  title: string;
  category: string;
  metric: string | null;
  description: string | null;
  image_url: string | null;
  gradient: string | null;
  display_order: number;
  is_published: boolean;
}

const emptyForm = { title: "", category: "", metric: "", description: "", image_url: "", gradient: "from-electric/80 to-navy", display_order: 0, is_published: true };

const AdminPortfolios = () => {
  const [items, setItems] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("portfolios").select("*").order("display_order");
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (p: Portfolio) => {
    setForm({ title: p.title, category: p.category, metric: p.metric ?? "", description: p.description ?? "", image_url: p.image_url ?? "", gradient: p.gradient ?? "", display_order: p.display_order, is_published: p.is_published });
    setEditing(p.id); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.category) { toast.error("Title dan category wajib diisi"); return; }
    setSaving(true);
    const payload = { title: form.title, category: form.category, metric: form.metric || null, description: form.description || null, image_url: form.image_url || null, gradient: form.gradient || null, display_order: form.display_order, is_published: form.is_published };
    const { error } = editing ? await supabase.from("portfolios").update(payload).eq("id", editing) : await supabase.from("portfolios").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Portfolio diupdate!" : "Portfolio dibuat!");
    setOpen(false); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus portfolio ini?")) return;
    await supabase.from("portfolios").delete().eq("id", id);
    toast.success("Portfolio dihapus"); fetch();
  };

  const setField = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

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
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${p.gradient ?? "from-electric to-navy"} shrink-0`} />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-primary truncate">{p.title}</h3>
                <p className="text-xs text-muted-foreground">{p.category} · {p.metric}</p>
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
            <div><Label>Title</Label><Input value={form.title} onChange={(e) => setField("title", e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Category</Label><Input value={form.category} onChange={(e) => setField("category", e.target.value)} /></div>
              <div><Label>Metric</Label><Input value={form.metric} onChange={(e) => setField("metric", e.target.value)} placeholder="+180% Growth" /></div>
            </div>
            <div><Label>Description</Label><Textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} /></div>
              <div><Label>Gradient</Label><Input value={form.gradient} onChange={(e) => setField("gradient", e.target.value)} placeholder="from-electric/80 to-navy" /></div>
            </div>
            <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setField("display_order", parseInt(e.target.value) || 0)} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={(v) => setField("is_published", v)} /><Label>Published</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-electric hover:bg-electric/90">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}{editing ? "Update" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPortfolios;
