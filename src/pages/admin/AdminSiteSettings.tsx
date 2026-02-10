import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2 } from "lucide-react";

interface Setting {
  id: string;
  key: string;
  value: string | null;
}

const AdminSiteSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const fetchSettings = async () => {
    setLoading(true);
    const { data } = await supabase.from("site_settings").select("*").order("key");
    setSettings(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchSettings(); }, []);

  const handleUpdate = async (id: string, value: string) => {
    const { error } = await supabase.from("site_settings").update({ value }).eq("id", id);
    if (error) toast.error(error.message);
  };

  const handleSaveAll = async () => {
    setSaving(true);
    for (const s of settings) {
      await supabase.from("site_settings").update({ value: s.value }).eq("id", s.id);
    }
    setSaving(false);
    toast.success("Settings disimpan!");
  };

  const handleAdd = async () => {
    if (!newKey) { toast.error("Key wajib diisi"); return; }
    const { error } = await supabase.from("site_settings").insert({ key: newKey, value: newValue || null });
    if (error) { toast.error(error.message); return; }
    toast.success("Setting ditambahkan!");
    setNewKey(""); setNewValue("");
    fetchSettings();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus setting ini?")) return;
    await supabase.from("site_settings").delete().eq("id", id);
    toast.success("Setting dihapus"); fetchSettings();
  };

  const updateLocal = (id: string, value: string) => {
    setSettings((prev) => prev.map((s) => (s.id === id ? { ...s, value } : s)));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Site Settings</h1>
        <Button onClick={handleSaveAll} disabled={saving} className="bg-electric hover:bg-electric/90">
          {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : <Save size={16} className="mr-1" />} Simpan Semua
        </Button>
      </div>

      {loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div> : (
        <div className="space-y-3">
          {settings.map((s) => (
            <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
              <div className="w-48 shrink-0">
                <span className="text-xs font-mono text-muted-foreground">{s.key}</span>
              </div>
              <Input value={s.value ?? ""} onChange={(e) => updateLocal(s.id, e.target.value)} className="flex-1" />
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive shrink-0"><Trash2 size={16} /></Button>
            </div>
          ))}

          <div className="border-t border-border pt-4 mt-4">
            <h3 className="text-sm font-semibold text-primary mb-3">Tambah Setting Baru</h3>
            <div className="flex gap-3">
              <Input value={newKey} onChange={(e) => setNewKey(e.target.value)} placeholder="key (e.g. hero_headline)" className="w-48" />
              <Input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="value" className="flex-1" />
              <Button onClick={handleAdd} variant="outline"><Plus size={16} /></Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSiteSettings;
