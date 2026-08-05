import { useRef } from "react";
import {
  Upload,
  Image,
  X,
} from "lucide-react";

interface UploadMediaModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadMediaModal = ({
  open,
  onClose,
}: UploadMediaModalProps) => {
  const fileInputRef =
    useRef<HTMLInputElement>(null);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}

      <div
        className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}

      <div className="fixed left-1/2 top-1/2 z-50 w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-violet-500/10 p-3">
              <Image className="h-6 w-6 text-violet-400" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                Upload Media
              </h2>

              <p className="text-sm text-zinc-400">
                Upload images, videos and documents.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-zinc-800"
          >
            <X className="h-5 w-5 text-zinc-400" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          {/* Drag & Drop */}

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="cursor-pointer rounded-2xl border-2 border-dashed border-zinc-700 p-10 text-center transition hover:border-violet-500 hover:bg-zinc-900"
          >

            <Upload className="mx-auto mb-4 h-12 w-12 text-violet-400" />

            <h3 className="text-lg font-semibold text-white">
              Drag & Drop files here
            </h3>

            <p className="mt-2 text-zinc-400">
              or click to browse from your computer
            </p>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
            />

          </div>

          {/* File Name */}

          <div>

            <label className="mb-2 block text-sm text-zinc-400">
              File Name
            </label>

            <input
              type="text"
              placeholder="Enter file name"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500"
            />

          </div>

          {/* Folder & Type */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Folder
              </label>

              <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500">

                <option>Homepage</option>
                <option>Marketing</option>
                <option>Products</option>
                <option>Branding</option>
                <option>Invoices</option>
                <option>Legal</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm text-zinc-400">
                Media Type
              </label>

              <select className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-violet-500">

                <option>Image</option>
                <option>Video</option>
                <option>Document</option>

              </select>

            </div>

          </div>

          {/* Upload Progress */}

          <div>

            <div className="mb-2 flex justify-between text-sm">

              <span className="text-zinc-400">
                Upload Progress
              </span>

              <span className="text-violet-400">
                0%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-zinc-800">

              <div className="h-full w-0 rounded-full bg-violet-500 transition-all duration-500" />

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-zinc-700 px-6 py-3 text-zinc-300 transition hover:border-violet-500"
          >
            Cancel
          </button>

          <button className="rounded-xl bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-500">

            Upload Media

          </button>

        </div>

      </div>

    </>
  );
};

export default UploadMediaModal;