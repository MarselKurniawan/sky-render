import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

interface Setting { id: string; key: string; value: string | null; }
interface SeoSetting {
  id: string; page_path: string; title: string | null; description: string | null;
  keywords: string[] | null; og_title: string | null; og_description: string | null;
  og_image_url: string | null; canonical_url: string | null;
}

const SPECIAL_KEYS = ["google_analytics_id", "google_search_console_verification", "hidden_keywords"];

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [seo, setSeo] = useState<SeoSetting | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  // SEO form for landing page
  const [seoForm, setSeoForm] = useState({
    title: "", description: "", keywords: "", og_title: "", og_description: "", og_image_url: "", canonical_url: "",
  });

  const fetchAll = async () => {
    setLoading(true);
    const [{ data: sets }, { data: seoData }] = await Promise.all([
      supabase.from("site_settings").select("*").order("key"),
      supabase.from("seo_settings").select("*").eq("page_path", "/").maybeSingle(),
    ]);
    setSettings(sets ?? []);
    if (seoData) {
      setSeo(seoData);
      setSeoForm({
        title: seoData.title ?? "", description: seoData.description ?? "",
        keywords: seoData.keywords?.join(", ") ?? "", og_title: seoData.og_title ?? "",
        og_description: seoData.og_description ?? "", og_image_url: seoData.og_image_url ?? "",
        canonical_url: seoData.canonical_url ?? "",
      });
    }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const getVal = (key: string) => settings.find(s => s.key === key)?.value ?? "";
  const updateLocal = (id: string, value: string) => setSettings(prev => prev.map(s => s.id === id ? { ...s, value } : s));
  const updateByKey = (key: string, value: string) => {
    setSettings(prev => {
      const exists = prev.find(s => s.key === key);
      if (exists) return prev.map(s => s.key === key ? { ...s, value } : s);
      return [...prev, { id: "new-" + key, key, value }];
    });
  };

  const handleSaveAll = async () => {
    setSaving(true);
    // Save site settings
    for (const s of settings) {
      if (s.id.startsWith("new-")) {
        await supabase.from("site_settings").insert({ key: s.key, value: s.value });
      } else {
        await supabase.from("site_settings").update({ value: s.value }).eq("id", s.id);
      }
    }
    // Save landing page SEO
    const seoPayload = {
      page_path: "/", title: seoForm.title || null, description: seoForm.description || null,
      keywords: seoForm.keywords ? seoForm.keywords.split(",").map(k => k.trim()).filter(Boolean) : null,
      og_title: seoForm.og_title || null, og_description: seoForm.og_description || null,
      og_image_url: seoForm.og_image_url || null, canonical_url: seoForm.canonical_url || null,
    };
    if (seo) {
      await supabase.from("seo_settings").update(seoPayload).eq("id", seo.id);
    } else {
      await supabase.from("seo_settings").insert(seoPayload);
    }
    setSaving(false);
    toast.success("Semua settings disimpan!");
    fetchAll();
  };

  const handleAdd = async () => {
    if (!newKey) { toast.error("Key wajib diisi"); return; }
    const { error } = await supabase.from("site_settings").insert({ key: newKey, value: newValue || null });
    if (error) { toast.error(error.message); return; }
    toast.success("Setting ditambahkan!");
    setNewKey(""); setNewValue(""); fetchAll();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus setting ini?")) return;
    await supabase.from("site_settings").delete().eq("id", id);
    toast.success("Setting dihapus"); fetchAll();
  };

  const otherSettings = settings.filter(s => !SPECIAL_KEYS.includes(s.key));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Site Settings</h1>
        <Button onClick={handleSaveAll} disabled={saving} className="bg-electric hover:bg-electric/90">
          {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-1" />} Simpan Semua
        </Button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div> : (
        <Tabs defaultValue="landing">
          <TabsList>
            <TabsTrigger value="landing">Landing Page & SEO</TabsTrigger>
            <TabsTrigger value="tracking">Tracking</TabsTrigger>
            <TabsTrigger value="other">Lainnya</TabsTrigger>
          </TabsList>

          <TabsContent value="landing" className="space-y-6 mt-4">
            {/* Landing page SEO */}
            <div className="p-5 rounded-xl bg-card border border-border space-y-4">
              <h3 className="text-sm font-semibold text-primary">🔍 SEO Landing Page</h3>
              <div><Label className="text-xs">Title (max 60)</Label><Input value={seoForm.title} onChange={e => setSeoForm(f => ({ ...f, title: e.target.value }))} maxLength={60} /><span className="text-[10px] text-muted-foreground">{seoForm.title.length}/60</span></div>
              <div><Label className="text-xs">Description (max 160)</Label><Textarea value={seoForm.description} onChange={e => setSeoForm(f => ({ ...f, description: e.target.value }))} rows={2} maxLength={160} /><span className="text-[10px] text-muted-foreground">{seoForm.description.length}/160</span></div>
              <div><Label className="text-xs">Keywords (comma)</Label><Input value={seoForm.keywords} onChange={e => setSeoForm(f => ({ ...f, keywords: e.target.value }))} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label className="text-xs">OG Title</Label><Input value={seoForm.og_title} onChange={e => setSeoForm(f => ({ ...f, og_title: e.target.value }))} /></div>
                <div><Label className="text-xs">OG Image URL</Label><Input value={seoForm.og_image_url} onChange={e => setSeoForm(f => ({ ...f, og_image_url: e.target.value }))} /></div>
              </div>
              <div><Label className="text-xs">OG Description</Label><Textarea value={seoForm.og_description} onChange={e => setSeoForm(f => ({ ...f, og_description: e.target.value }))} rows={2} /></div>
              <div><Label className="text-xs">Canonical URL</Label><Input value={seoForm.canonical_url} onChange={e => setSeoForm(f => ({ ...f, canonical_url: e.target.value }))} /></div>
            </div>

            {/* Hidden Keywords */}
            <div className="p-5 rounded-xl bg-card border border-border space-y-3">
              <h3 className="text-sm font-semibold text-primary">🔑 Hidden Keywords Landing Page</h3>
              <p className="text-xs text-muted-foreground">Keyword tersembunyi di landing page (font 1px transparan).</p>
              <Textarea value={getVal("hidden_keywords")} onChange={e => updateByKey("hidden_keywords", e.target.value)} placeholder="digital agency, jasa website, branding..." rows={3} />
            </div>

            {/* Landing page headers */}
            <div className="p-5 rounded-xl bg-card border border-border space-y-3">
              <h3 className="text-sm font-semibold text-primary">📝 Header Landing Page</h3>
              {otherSettings.filter(s => s.key.startsWith("hero_") || s.key.startsWith("header_")).map(s => (
                <div key={s.id} className="flex items-center gap-3">
                  <span className="text-xs font-mono text-muted-foreground w-40 shrink-0">{s.key}</span>
                  <Input value={s.value ?? ""} onChange={e => updateLocal(s.id, e.target.value)} className="flex-1" />
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tracking" className="space-y-6 mt-4">
            <div className="p-5 rounded-xl bg-card border border-border space-y-4">
              <h3 className="text-sm font-semibold text-primary">📊 Google Analytics & Search Console</h3>
              <div><Label className="text-xs">Google Analytics ID</Label><Input value={getVal("google_analytics_id")} onChange={e => updateByKey("google_analytics_id", e.target.value)} placeholder="G-XXXXXXXXXX" /></div>
              <div><Label className="text-xs">Google Search Console Verification</Label><Input value={getVal("google_search_console_verification")} onChange={e => updateByKey("google_search_console_verification", e.target.value)} /></div>
            </div>
          </TabsContent>

          <TabsContent value="other" className="space-y-4 mt-4">
            {otherSettings.filter(s => !s.key.startsWith("hero_") && !s.key.startsWith("header_")).map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                <span className="text-xs font-mono text-muted-foreground w-48 shrink-0">{s.key}</span>
                <Input value={s.value ?? ""} onChange={e => updateLocal(s.id, e.target.value)} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive shrink-0"><Trash2 size={16} /></Button>
              </div>
            ))}
            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-semibold text-primary mb-3">Tambah Setting Baru</h3>
              <div className="flex gap-3">
                <Input value={newKey} onChange={e => setNewKey(e.target.value)} placeholder="key" className="w-48" />
                <Input value={newValue} onChange={e => setNewValue(e.target.value)} placeholder="value" className="flex-1" />
                <Button onClick={handleAdd} variant="outline"><Plus size={16} /></Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default AdminSiteSettings;
