import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/Input';
import { getMyProfile, updateMyProfile } from '@/api/profile';

interface ProfileModalProps {
  onClose: () => void;
  initialHandle?: string;
}

export function ProfileModal({ onClose, initialHandle }: ProfileModalProps) {
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; handle?: string }>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [handle, setHandle] = useState(initialHandle || '');

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const profile = await getMyProfile();
        if (!mounted) return;
        setName(profile?.name || '');
        setEmail(profile?.email || '');
        setHandle(profile?.handle || initialHandle || '');
      } catch (e) {
        // ignore — allow user to edit manually
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [initialHandle]);

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Please enter your name';
    if (!email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) e.email = 'Enter a valid email';
    if (!handle.trim() || !/^[a-zA-Z0-9_\-]+$/.test(handle)) e.handle = 'Handle may only contain letters, numbers, - and _';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSuccess('');
    try {
      await updateMyProfile({ name: name.trim(), email: email.trim(), handle: handle.trim() });
      setSuccess('Profile updated');
      setTimeout(() => {
        onClose();
      }, 800);
    } catch (err) {
      setSuccess('');
      setErrors(prev => ({ ...prev, handle: 'Failed to save. Try a different handle.' }));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div>
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Edit Profile</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">Update your name, email and handle</p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <Input label="Name" value={name} onChange={e => setName(e.target.value)} error={errors.name} />
            <Input label="Email" value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
            <Input label="Handle" value={handle} onChange={e => setHandle(e.target.value)} error={errors.handle} />
          </div>

          {success && (
            <div className="text-sm text-green-700 dark:text-green-300">{success}</div>
          )}

          <div className="flex items-center justify-end gap-3">
            <Button variant="secondary" onClick={onClose} className="px-6">Cancel</Button>
            <Button onClick={onSave} className="px-6" disabled={saving || loading}>
              {saving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
