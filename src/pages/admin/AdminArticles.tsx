import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string;
  article_type: string;
  hashtags: string[] | null;
  image_url: string | null;
  read_time: string | null;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  created_at: string;
}

const emptyForm = {
  title: "", slug: "", excerpt: "", content: "", category: "digital-marketing",
  article_type: "blog", hashtags: "", image_url: "", read_time: "",
  is_published: false, seo_title: "", seo_description: "", seo_keywords: "",
};

const AdminArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    const { data } = await supabase.from("articles").select("*").order("created_at", { ascending: false });
    setArticles(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchArticles(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (a: Article) => {
    setForm({
      title: a.title, slug: a.slug, excerpt: a.excerpt ?? "", content: a.content ?? "",
      category: a.category, article_type: a.article_type,
      hashtags: a.hashtags?.join(", ") ?? "", image_url: a.image_url ?? "",
      read_time: a.read_time ?? "", is_published: a.is_published,
      seo_title: a.seo_title ?? "", seo_description: a.seo_description ?? "",
      seo_keywords: a.seo_keywords?.join(", ") ?? "",
    });
    setEditing(a.id);
    setOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("Title dan slug wajib diisi"); return; }
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, excerpt: form.excerpt || null,
      content: form.content || null, category: form.category,
      article_type: form.article_type,
      hashtags: form.hashtags ? form.hashtags.split(",").map((h) => h.trim()).filter(Boolean) : null,
      image_url: form.image_url || null, read_time: form.read_time || null,
      is_published: form.is_published,
      published_at: form.is_published ? new Date().toISOString() : null,
      seo_title: form.seo_title || null, seo_description: form.seo_description || null,
      seo_keywords: form.seo_keywords ? form.seo_keywords.split(",").map((k) => k.trim()).filter(Boolean) : null,
    };

    const { error } = editing
      ? await supabase.from("articles").update(payload).eq("id", editing)
      : await supabase.from("articles").insert(payload);

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Artikel diupdate!" : "Artikel dibuat!");
    setOpen(false);
    fetchArticles();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus artikel ini?")) return;
    await supabase.from("articles").delete().eq("id", id);
    toast.success("Artikel dihapus");
    fetchArticles();
  };

  const setField = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Artikel</h1>
        <Button onClick={openNew} className="bg-electric hover:bg-electric/90"><Plus size={16} className="mr-1" /> Tambah Artikel</Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div>
      ) : articles.length === 0 ? (
        <p className="text-muted-foreground text-center py-12">Belum ada artikel.</p>
      ) : (
        <div className="space-y-3">
          {articles.map((a) => (
            <div key={a.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${a.is_published ? "text-emerald-500" : "text-muted-foreground"}`}>
                    {a.is_published ? "Published" : "Draft"}
                  </span>
                  <span className="text-[10px] text-muted-foreground uppercase">{a.article_type}</span>
                </div>
                <h3 className="font-semibold text-sm text-primary truncate">{a.title}</h3>
                <p className="text-xs text-muted-foreground">{a.category} · {a.slug}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => openEdit(a)}><Pencil size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(a.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Artikel" : "Tambah Artikel"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setField("title", e.target.value)} /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setField("slug", e.target.value)} placeholder="judul-artikel" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Type</Label>
                <Select value={form.article_type} onValueChange={(v) => setField("article_type", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="profiling">Profiling</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Kategori</Label>
                <Input value={form.category} onChange={(e) => setField("category", e.target.value)} placeholder="digital-marketing" />
              </div>
            </div>
            <div><Label>Excerpt</Label><Textarea value={form.excerpt} onChange={(e) => setField("excerpt", e.target.value)} rows={2} /></div>
            <div><Label>Content</Label><Textarea value={form.content} onChange={(e) => setField("content", e.target.value)} rows={8} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Image URL</Label><Input value={form.image_url} onChange={(e) => setField("image_url", e.target.value)} /></div>
              <div><Label>Read Time</Label><Input value={form.read_time} onChange={(e) => setField("read_time", e.target.value)} placeholder="5 menit" /></div>
            </div>
            <div><Label>Hashtags (comma-separated)</Label><Input value={form.hashtags} onChange={(e) => setField("hashtags", e.target.value)} placeholder="#SaatnyaKamuTau, #SaatMusik" /></div>
            
            <div className="border-t border-border pt-4">
              <h4 className="font-semibold text-sm text-primary mb-3">SEO Settings</h4>
              <div className="space-y-3">
                <div><Label>SEO Title</Label><Input value={form.seo_title} onChange={(e) => setField("seo_title", e.target.value)} /></div>
                <div><Label>SEO Description</Label><Textarea value={form.seo_description} onChange={(e) => setField("seo_description", e.target.value)} rows={2} /></div>
                <div><Label>SEO Keywords (comma-separated)</Label><Input value={form.seo_keywords} onChange={(e) => setField("seo_keywords", e.target.value)} /></div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch checked={form.is_published} onCheckedChange={(v) => setField("is_published", v)} />
              <Label>Published</Label>
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

export default AdminArticles;
