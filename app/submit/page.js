"use client";
import {useAuth} from "@/components/AuthContext";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

export default function SubmitPage() {
  const {user, loading} = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    tagline: "",
    description: "",
    website: "",
    category: "",
    image: "", // to hold uploaded image URL
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [loading, user]);

  if (loading || (!user && !loading)) {
    return null;
  }

  // if (loading) return <div>Loading...</div>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // mock preview
        setForm({...form, image: reader.result}); // store base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify({...form, submittedBy: user.username}),
    });
    if (res.ok) router.push("/explore");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Submit Product</h1>
      {["name", "tagline", "website", "category"].map((field) => (
        <div key={field} className="mb-2">
          <Label className="mb-1">
            {field.charAt(0).toUpperCase() + field.slice(1)}
          </Label>
          <Input
            placeholder={field}
            value={form[field]}
            onChange={(e) => setForm({...form, [field]: e.target.value})}
          />
        </div>
      ))}
      <Label className="mb-1">Description</Label>
      <Textarea
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({...form, description: e.target.value})}
      />

      <Label className="mb-1 mt-2">Image Upload</Label>
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-2"
      />
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-40 object-cover my-2 rounded"
        />
      )}

      <Button onClick={handleSubmit} className="mt-4">
        Submit
      </Button>
    </div>
  );
}
