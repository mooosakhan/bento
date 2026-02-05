import React, { useState } from 'react';
import { Block, NavbarNavItem } from '@/types';
import { Plus, Trash2, Pencil, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { AvatarPickerModal } from '../../avatar/AvatarPickerModal';

interface NavbarEditorProps {
  selectedBlock: Block;
  onUpdateBlock: (blockId: string, props: any) => void;
}

export const NavbarEditor: React.FC<NavbarEditorProps> = ({ selectedBlock, onUpdateBlock }) => {
  const [showLogoPicker, setShowLogoPicker] = useState(false);
  const [isNavItemsVisible, setIsNavItemsVisible] = useState(true); // Add toggle state for navigation items visibility

  const handlePropChange = (key: string, value: any) => {
    onUpdateBlock(selectedBlock.id, {
      ...selectedBlock.props,
      [key]: value,
    });
  };

  const update = (updates: any) => {
    const merged = { ...selectedBlock.props, ...updates };
    onUpdateBlock(selectedBlock.id, merged);
  };

  const navItems: NavbarNavItem[] = Array.isArray(selectedBlock.props?.navItems)
    ? selectedBlock.props.navItems
    : [];

  const addItem = () => {
    update({
      navItems: [
        ...navItems,
        {
          id: `nav-${Date.now()}`,
          label: "New",
          href: "",
          show: true,
        },
      ],
    });
  };

  const removeItem = (id: string) => {
    update({ navItems: navItems.filter((i) => i.id !== id) });
  };

  const updateItem = (id: string, patch: Partial<NavbarNavItem>) => {
    update({
      navItems: navItems.map((i) =>
        i.id === id ? { ...i, ...patch } : i
      ),
    });
  };

  const Segmented = ({
    value: current,
    onChange,
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
  }) => (
    <div className="flex rounded-lg mt-2 border overflow-hidden">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`flex-1 py-1 text-xs capitalize transition cursor-pointer
            ${current === opt
              ? "bg-neutral-900 text-white"
              : "bg-transparent text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const toggleNavItemsVisibility = () => setIsNavItemsVisible((prev) => !prev);

  return (
    <div className="space-y-4">
      {/* ===== CONTENT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wide">
          Content
        </h3>

        <Input
          label="Brand Text"
          value={selectedBlock.props.brandText || ''}
          onChange={(e) => handlePropChange('brandText', e.target.value)}
          placeholder="Your Brand"
        />
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== LOGO ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wide">
          Logo
        </h3>

        <Toggle
          label="Show Logo"
          checked={selectedBlock.props.showLogo ?? true}
          onChange={(checked: boolean) => handlePropChange('showLogo', checked)}
        />

        {/* Logo Preview */}
        {(selectedBlock.props.showLogo ?? true) && selectedBlock.props.logoUrl ? (
          <div className="space-y-2">
            <button
              onClick={() => setShowLogoPicker(true)}
              className="relative group w-16 h-16 overflow-hidden border-2 border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all mx-auto"
              style={{
                borderRadius: `${selectedBlock.props.logoRoundness !== undefined ? selectedBlock.props.logoRoundness : 8}%`,
                backgroundColor: selectedBlock.props.logoBgColor || '#ffffff',
              }}
            >
              <img
                src={selectedBlock.props.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Pencil className="w-4 h-4 text-white" />
              </div>
            </button>


          </div>
        ) : (
          <Button
            onClick={() => setShowLogoPicker(true)}
            variant="secondary"
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Logo
          </Button>
        )}

        {(selectedBlock.props.showLogo ?? true) && selectedBlock.props.logoUrl && (
          <>
            <ColorPicker
              label="Background Color"
              value={selectedBlock.props.logoBgColor || '#ffffff'}
              onChange={(color) => handlePropChange('logoBgColor', color)}
              showTransparent={true}
            />

            <div>
              <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                <span>Roundness</span>
                <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.logoRoundness !== undefined ? selectedBlock.props.logoRoundness : 8}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedBlock.props.logoRoundness !== undefined ? selectedBlock.props.logoRoundness : 8}
                onChange={(e) => handlePropChange('logoRoundness', parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
              />
            </div>

            <div>
              <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400 mb-1">
                <span>Size</span>
                <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props.logoSize || 40}px</span>
              </label>
              <input
                type="range"
                min="20"
                max="100"
                value={selectedBlock.props.logoSize || 40}
                onChange={(e) => handlePropChange('logoSize', parseInt(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
              />
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== NAVIGATION ITEMS ===== */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <h3 className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wide">
            Navigation Items
          </h3>
          <button onClick={toggleNavItemsVisibility}>
            <ChevronDown className={`w-4 h-4 transition-transform ${isNavItemsVisible ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {isNavItemsVisible && (
          <div className='space-y-2'>
            <div className="grid grid-cols-14 items-center ">
              <h4 className="col-span-13 text-xs font-medium text-neutral-700 dark:text-neutral-100">
                Navs
              </h4>

              <Button
                onClick={addItem}
                className="col-span-1 h-7.5 p-0 flex items-center justify-center bg-transparent hover:bg-transparent hover:text-neutral-50 text-neutral-100"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Nav Items */}
            <div className="space-y-2">
              {(navItems || []).map((item) => (
                <div
                  key={item.id}
                  className="px-2 py-1 bg-white dark:bg-[#121111] rounded"
                >
                  <div className="grid group grid-cols-14 gap-2 items-center">
                    <input
                      value={item.label}
                      onChange={(e) =>
                        updateItem(item.id, { label: e.target.value })
                      }
                      className="col-span-6 w-full px-2 h-7.5 rounded-lg text-xs text-neutral-900 dark:text-neutral-300 bg-neutral-50 dark:bg-transparent border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                      placeholder="Label"
                    />

                    <input
                      value={item.href}
                      onChange={(e) =>
                        updateItem(item.id, { href: e.target.value })
                      }
                      className="col-span-7 w-full px-2 h-7.5 rounded-lg bg-neutral-50 dark:bg-[#333232] text-xs text-neutral-900 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-1 focus:ring-neutral-400"
                      placeholder="#href"
                    />

                    <Button
                      onClick={() => removeItem(item.id)}
                      className="col-span-1 h-7.5 p-0 flex items-center justify-center bg-transparent text-neutral-400 opacity-20 group-hover:opacity-100 hover:text-red-500 transition hover:bg-transparent"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <label className="flex justify-between text-xs text-neutral-600 dark:text-neutral-400">
                <span>Gap</span>
                <span className="font-medium text-neutral-900 dark:text-white">{selectedBlock.props?.itemsGap ?? 16}px</span>
              </label>
              <input
                type="range"
                min={0}
                max={48}
                step={4}
                value={selectedBlock.props?.itemsGap ?? 16}
                onChange={(e) =>
                  update({ itemsGap: parseInt(e.target.value) })
                }
                className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-700 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white"
              />
            </div>
          </div>
        )}

      </div>



      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== LAYOUT ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wide">
          Layout
        </h3>

        <Toggle
          label="Show Search"
          checked={selectedBlock.props.showSearch ?? true}
          onChange={(checked: boolean) => handlePropChange('showSearch', checked)}
        />

        <div className="flex flex-col space-y-3">
          <div>
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Logo Alignment</label>
            <Segmented
              value={selectedBlock.props?.logoAlignment || "left"}
              onChange={(v) => update({ logoAlignment: v })}
              options={["left", "center", "right"]}
            />
          </div>

          <div>
            <label className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Nav Alignment</label>
            <Segmented
              value={selectedBlock.props?.navAlignment || "right"}
              onChange={(v) => update({ navAlignment: v })}
              options={["left", "center", "right"]}
            />
          </div>
        </div>


      </div>

      {/* Divider */}
      <div className="border-t border-neutral-200 dark:border-neutral-800"></div>

      {/* ===== BACKGROUND ===== */}
      <div className="space-y-3">
        <h3 className="text-xs font-semibold text-neutral-800 dark:text-white uppercase tracking-wide">
          Background
        </h3>

        <div className="space-y-2">

          <div className="grid grid-cols-2 gap-2 mt-2">
            {["transparent", "solid"].map((type) => (
              <button
                key={type}
                onClick={() => update({ bgType: type })}
                className={`p-2 cursor-pointer rounded border text-xs capitalize transition
                  ${selectedBlock.props?.bgType === type
                    ? "border-neutral-900 bg-neutral-100 dark:bg-neutral-800"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  }`}
              >
                {type}
              </button>
            ))}
          </div>

          {selectedBlock.props?.bgType === "solid" && (
            <ColorPicker
              value={selectedBlock.props?.bgColor || "#ffffff"}
              onChange={(color) => update({ bgColor: color })}
              showTransparent={true}
            />
          )}

          {/* {selectedBlock.props?.bgType === "gradient" && (
            <input
              type="text"
              placeholder="linear-gradient(...)"
              value={selectedBlock.props?.bgGradient || ""}
              onChange={(e) =>
                update({ bgGradient: e.target.value })
              }
              className="w-full px-2 py-1 rounded border text-xs"
            />
          )}

          {selectedBlock.props?.bgType === "image" && (
            <input
              type="text"
              placeholder="Image URL"
              value={selectedBlock.props?.bgImage || ""}
              onChange={(e) =>
                update({ bgImage: e.target.value })
              }
              className="w-full px-2 py-1 rounded border text-xs"
            />
          )} */}
        </div>
      </div>



      {/* Logo Picker Modal */}
      {showLogoPicker && (
        <AvatarPickerModal
          currentAvatar={selectedBlock.props.logoUrl || ''}
          onSelect={(avatarData) => {
            handlePropChange('logoUrl', avatarData.value);
            setShowLogoPicker(false);
          }}
          onClose={() => setShowLogoPicker(false)}
        />
      )}
    </div>
  );
};
