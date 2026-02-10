import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface SeoSetting {
  id: string;
  page_path: string;
  title: string | null;
  description: string | null;
  keywords: string[] | null;
  og_title: string | null;
  og_description: string | null;
  og_image_url: string | null;
  canonical_url: string | null;
}

const emptyForm = { page_path: "/", title: "", description: "", keywords: "", og_title: "", og_description: "", og_image_url: "", canonical_url: "" };

const AdminSeo = () => {
  const [items, setItems] = useState<SeoSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetch = async () => {
    setLoading(true);
    const { data } = await supabase.from("seo_settings").select("*").order("page_path");
    setItems(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetch(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (s: SeoSetting) => {
    setForm({ page_path: s.page_path, title: s.title ?? "", description: s.description ?? "", keywords: s.keywords?.join(", ") ?? "", og_title: s.og_title ?? "", og_description: s.og_description ?? "", og_image_url: s.og_image_url ?? "", canonical_url: s.canonical_url ?? "" });
    setEditing(s.id); setOpen(true);
  };

  const handleSave = async () => {
    if (!form.page_path) { toast.error("Page path wajib diisi"); return; }
    setSaving(true);
    const payload = { page_path: form.page_path, title: form.title || null, description: form.description || null, keywords: form.keywords ? form.keywords.split(",").map(k => k.trim()).filter(Boolean) : null, og_title: form.og_title || null, og_description: form.og_description || null, og_image_url: form.og_image_url || null, canonical_url: form.canonical_url || null };
    const { error } = editing ? await supabase.from("seo_settings").update(payload).eq("id", editing) : await supabase.from("seo_settings").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success("SEO disimpan!");
    setOpen(false); fetch();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus SEO setting ini?")) return;
    await supabase.from("seo_settings").delete().eq("id", id);
    toast.success("SEO dihapus"); fetch();
  };

  const setField = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">SEO Settings</h1>
        <Button onClick={openNew} className="bg-electric hover:bg-electric/90"><Plus size={16} className="mr-1" /> Tambah</Button>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div> : items.length === 0 ? <p className="text-muted-foreground text-center py-12">Belum ada SEO settings.</p> : (
        <div className="space-y-3">
          {items.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-primary font-mono">{s.page_path}</h3>
                <p className="text-xs text-muted-foreground truncate">{s.title ?? "No title"}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit SEO" : "Tambah SEO"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Page Path</Label><Input value={form.page_path} onChange={(e) => setField("page_path", e.target.value)} placeholder="/" /></div>
            <div><Label>Title (max 60 chars)</Label><Input value={form.title} onChange={(e) => setField("title", e.target.value)} maxLength={60} /><span className="text-[10px] text-muted-foreground">{form.title.length}/60</span></div>
            <div><Label>Description (max 160 chars)</Label><Textarea value={form.description} onChange={(e) => setField("description", e.target.value)} rows={2} maxLength={160} /><span className="text-[10px] text-muted-foreground">{form.description.length}/160</span></div>
            <div><Label>Keywords (comma-separated)</Label><Input value={form.keywords} onChange={(e) => setField("keywords", e.target.value)} /></div>
            <div className="border-t border-border pt-3">
              <h4 className="text-sm font-semibold text-primary mb-2">Open Graph</h4>
              <div className="space-y-3">
                <div><Label>OG Title</Label><Input value={form.og_title} onChange={(e) => setField("og_title", e.target.value)} /></div>
                <div><Label>OG Description</Label><Textarea value={form.og_description} onChange={(e) => setField("og_description", e.target.value)} rows={2} /></div>
                <div><Label>OG Image URL</Label><Input value={form.og_image_url} onChange={(e) => setField("og_image_url", e.target.value)} /></div>
              </div>
            </div>
            <div><Label>Canonical URL</Label><Input value={form.canonical_url} onChange={(e) => setField("canonical_url", e.target.value)} /></div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-electric hover:bg-electric/90">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}{editing ? "Update" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSeo;
