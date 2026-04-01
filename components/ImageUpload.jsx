'use client';
import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  const upload = async (file) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
      const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', preset);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) onChange(data.secure_url);
      else setError('Upload failed: ' + (data.error?.message || 'Unknown error'));
    } catch (e) {
      setError('Upload error: ' + e.message);
    }
    setUploading(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-slate-400 text-xs font-medium uppercase tracking-wider">{label}</label>

      {value ? (
        <div className="relative w-full h-40 rounded-xl overflow-hidden border border-white/10 group">
          <img src={value} alt="Uploaded" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange('')}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-rose-500/80 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={13} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="w-full h-32 rounded-xl border-2 border-dashed border-white/20 hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-slate-500 hover:text-slate-300 transition-all duration-300 disabled:opacity-50"
        >
          {uploading ? (
            <>
              <Loader2 size={22} className="animate-spin text-primary" />
              <span className="text-xs">Uploading...</span>
            </>
          ) : (
            <>
              <Upload size={22} />
              <span className="text-xs">Click to upload image</span>
              <span className="text-xs opacity-50">PNG, JPG, WEBP</span>
            </>
          )}
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => upload(e.target.files?.[0])}
      />

      {error && <p className="text-rose-400 text-xs">{error}</p>}
    </div>
  );
}
