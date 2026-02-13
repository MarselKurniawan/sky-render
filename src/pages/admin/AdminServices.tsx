import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Loader2, DollarSign, X } from "lucide-react";

interface Service {
  id: string; title: string; slug: string; description: string | null;
  icon_name: string | null; items: string[] | null; display_order: number; is_published: boolean;
}

interface ServicePrice {
  id: string; service_id: string; name: string; description: string | null;
  price: string; features: string[] | null; is_popular: boolean; display_order: number;
}

const ICON_OPTIONS = [
  "Globe", "Palette", "Code", "Search", "Megaphone", "Camera", "Video", "PenTool",
  "BarChart", "TrendingUp", "Share2", "Layout", "Smartphone", "Monitor", "Database",
  "Shield", "Zap", "Users", "MessageSquare", "Mail", "FileText", "Image", "Music",
  "ShoppingCart", "Briefcase", "Target", "Award", "Star", "Heart", "Settings",
];

const emptyForm = { title: "", slug: "", description: "", icon_name: "Globe", items: [] as string[], display_order: 0, is_published: true };
const emptyPrice = { name: "", description: "", price: "", features: "", is_popular: false, display_order: 0 };

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [newItem, setNewItem] = useState("");

  const [priceOpen, setPriceOpen] = useState(false);
  const [priceServiceId, setPriceServiceId] = useState<string | null>(null);
  const [prices, setPrices] = useState<ServicePrice[]>([]);
  const [priceForm, setPriceForm] = useState(emptyPrice);
  const [editingPrice, setEditingPrice] = useState<string | null>(null);
  const [priceFormOpen, setPriceFormOpen] = useState(false);

  const fetchAll = async () => {
    setLoading(true);
    const { data } = await supabase.from("services").select("*").order("display_order");
    setServices(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const openNew = () => { setForm(emptyForm); setEditing(null); setOpen(true); };
  const openEdit = (s: Service) => {
    setForm({ title: s.title, slug: s.slug, description: s.description ?? "", icon_name: s.icon_name ?? "Globe", items: s.items ?? [], display_order: s.display_order, is_published: s.is_published });
    setEditing(s.id); setOpen(true);
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    setForm(f => ({ ...f, items: [...f.items, newItem.trim()] }));
    setNewItem("");
  };

  const removeItem = (idx: number) => {
    setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== idx) }));
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast.error("Title dan slug wajib diisi"); return; }
    setSaving(true);
    const payload = {
      title: form.title, slug: form.slug, description: form.description || null,
      icon_name: form.icon_name || null, items: form.items.length > 0 ? form.items : null,
      display_order: form.display_order, is_published: form.is_published,
    };
    const { error } = editing ? await supabase.from("services").update(payload).eq("id", editing) : await supabase.from("services").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(editing ? "Layanan diupdate!" : "Layanan dibuat!");
    setOpen(false); fetchAll();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus layanan ini?")) return;
    await supabase.from("services").delete().eq("id", id);
    toast.success("Layanan dihapus"); fetchAll();
  };

  // Price methods
  const openPrices = async (serviceId: string) => {
    setPriceServiceId(serviceId);
    const { data } = await supabase.from("service_prices").select("*").eq("service_id", serviceId).order("display_order");
    setPrices(data ?? []);
    setPriceOpen(true);
  };
  const openNewPrice = () => { setPriceForm(emptyPrice); setEditingPrice(null); setPriceFormOpen(true); };
  const openEditPrice = (p: ServicePrice) => {
    setPriceForm({ name: p.name, description: p.description ?? "", price: p.price, features: p.features?.join(", ") ?? "", is_popular: p.is_popular, display_order: p.display_order });
    setEditingPrice(p.id); setPriceFormOpen(true);
  };
  const handleSavePrice = async () => {
    if (!priceForm.name || !priceForm.price) { toast.error("Nama dan harga wajib diisi"); return; }
    const payload = { service_id: priceServiceId!, name: priceForm.name, description: priceForm.description || null, price: priceForm.price, features: priceForm.features ? priceForm.features.split(",").map(f => f.trim()).filter(Boolean) : null, is_popular: priceForm.is_popular, display_order: priceForm.display_order };
    const { error } = editingPrice ? await supabase.from("service_prices").update(payload).eq("id", editingPrice) : await supabase.from("service_prices").insert(payload);
    if (error) { toast.error(error.message); return; }
    toast.success("Harga disimpan!");
    setPriceFormOpen(false);
    openPrices(priceServiceId!);
  };
  const handleDeletePrice = async (id: string) => {
    if (!confirm("Hapus harga ini?")) return;
    await supabase.from("service_prices").delete().eq("id", id);
    toast.success("Harga dihapus");
    openPrices(priceServiceId!);
  };
  const setPField = (key: string, value: any) => setPriceForm((f) => ({ ...f, [key]: value }));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Layanan</h1>
        <Button onClick={openNew} className="bg-electric hover:bg-electric/90"><Plus size={16} className="mr-1" /> Tambah</Button>
      </div>
      {loading ? <div className="flex justify-center py-12"><Loader2 className="animate-spin text-electric" size={24} /></div> : services.length === 0 ? <p className="text-muted-foreground text-center py-12">Belum ada layanan.</p> : (
        <div className="space-y-3">
          {services.map((s) => (
            <div key={s.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-primary truncate">{s.title}</h3>
                <p className="text-xs text-muted-foreground">{s.icon_name} · Order: {s.display_order} · {s.items?.length ?? 0} detail</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => openPrices(s.id)}><DollarSign size={14} className="mr-1" /> Pricelist</Button>
              <Button variant="ghost" size="icon" onClick={() => openEdit(s)}><Pencil size={16} /></Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Edit Layanan" : "Tambah Layanan"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Title</Label><Input value={form.title} onChange={(e) => setForm(f => ({ ...f, title: e.target.value }))} /></div>
              <div><Label>Slug</Label><Input value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value }))} placeholder="web-development" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Icon</Label>
                <Select value={form.icon_name} onValueChange={(v) => setForm(f => ({ ...f, icon_name: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent className="max-h-60 bg-card">
                    {ICON_OPTIONS.map((icon) => (
                      <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Display Order</Label><Input type="number" value={form.display_order} onChange={(e) => setForm(f => ({ ...f, display_order: parseInt(e.target.value) || 0 }))} /></div>
            </div>
            <div><Label>Description</Label><Input value={form.description} onChange={(e) => setForm(f => ({ ...f, description: e.target.value }))} /></div>
            
            <div>
              <Label>Detail Layanan (List)</Label>
              <div className="space-y-2 mt-1">
                {form.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-border">
                    <span className="flex-1 text-sm">{item}</span>
                    <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => removeItem(idx)}><X size={14} /></Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Tambah detail layanan..." onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }} />
                  <Button type="button" variant="outline" onClick={addItem}><Plus size={14} /></Button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2"><Switch checked={form.is_published} onCheckedChange={(v) => setForm(f => ({ ...f, is_published: v }))} /><Label>Published</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full bg-electric hover:bg-electric/90">
              {saving ? <Loader2 className="animate-spin mr-2" size={16} /> : null}{editing ? "Update" : "Simpan"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Pricelist Dialog */}
      <Dialog open={priceOpen} onOpenChange={setPriceOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Pricelist — {services.find(s => s.id === priceServiceId)?.title}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            {prices.map((p) => (
              <div key={p.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-primary">{p.name}</span>
                    {p.is_popular && <span className="text-[10px] bg-electric text-accent-foreground px-2 py-0.5 rounded-full">Popular</span>}
                  </div>
                  <p className="text-xs text-electric font-bold">{p.price}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => openEditPrice(p)}><Pencil size={14} /></Button>
                <Button variant="ghost" size="icon" onClick={() => handleDeletePrice(p.id)} className="text-destructive"><Trash2 size={14} /></Button>
              </div>
            ))}
            <Button onClick={openNewPrice} variant="outline" className="w-full"><Plus size={14} className="mr-1" /> Tambah Harga</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Price Form Dialog */}
      <Dialog open={priceFormOpen} onOpenChange={setPriceFormOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingPrice ? "Edit Harga" : "Tambah Harga"}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Nama Paket</Label><Input value={priceForm.name} onChange={(e) => setPField("name", e.target.value)} /></div>
            <div><Label>Harga</Label><Input value={priceForm.price} onChange={(e) => setPField("price", e.target.value)} placeholder="Mulai dari Rp 2.500.000" /></div>
            <div><Label>Description</Label><Input value={priceForm.description} onChange={(e) => setPField("description", e.target.value)} /></div>
            <div><Label>Features (comma-separated)</Label><Input value={priceForm.features} onChange={(e) => setPField("features", e.target.value)} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><Label>Display Order</Label><Input type="number" value={priceForm.display_order} onChange={(e) => setPField("display_order", parseInt(e.target.value) || 0)} /></div>
              <div className="flex items-center gap-2 pt-6"><Switch checked={priceForm.is_popular} onCheckedChange={(v) => setPField("is_popular", v)} /><Label>Popular</Label></div>
            </div>
            <Button onClick={handleSavePrice} className="w-full bg-electric hover:bg-electric/90">{editingPrice ? "Update" : "Simpan"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
