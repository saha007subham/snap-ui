export const fileUploadUsageCode = `import { FileUpload } from "@/components/ui/FileUpload";

export default function FileUploadDemo() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-xl mx-auto">
      {/* 1. Standard Dropzone */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Drag & Drop Zone (Multiple PDF or Images, max 5MB)
        </h3>
        <FileUpload
          variant="dropzone"
          multiple={true}
          accept="image/*, .pdf"
          maxSize={5 * 1024 * 1024} // 5MB
          maxFiles={3}
          simulateUpload={true}
        />
      </div>

      {/* 2. Compact Button */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Compact Button Layout
        </h3>
        <FileUpload
          variant="button"
          multiple={false}
          maxSize={2 * 1024 * 1024} // 2MB
          simulateUpload={true}
        />
      </div>

      {/* 3. Avatar Upload */}
      <div className="space-y-2 flex flex-col items-center">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 self-start">
          Avatar Photo Upload
        </h3>
        <FileUpload
          variant="avatar"
          accept="image/*"
          maxSize={1 * 1024 * 1024} // 1MB
          simulateUpload={true}
        />
      </div>
    </div>
  );
}
`;
