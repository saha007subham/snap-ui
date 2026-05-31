import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud,
  File,
  FileText,
  Image as ImageIcon,
  Film,
  Music,
  Archive,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Camera,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { cn } from "@/utils/cn";

// Helper: format file size
function formatBytes(bytes, decimals = 2) {
  if (!bytes || bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

// Helper: Get icon based on file type / extension
function getFileIcon(file) {
  const type = file.type || "";
  const name = file.name || "";
  
  if (type.startsWith("image/")) return ImageIcon;
  if (type.startsWith("video/")) return Film;
  if (type.startsWith("audio/")) return Music;
  
  if (
    type.includes("pdf") ||
    name.endsWith(".pdf")
  ) return FileText;
  
  if (
    type.includes("zip") ||
    type.includes("rar") ||
    type.includes("tar") ||
    type.includes("gzip") ||
    name.endsWith(".zip") ||
    name.endsWith(".rar") ||
    name.endsWith(".tar") ||
    name.endsWith(".gz")
  ) return Archive;
  
  if (
    type.includes("word") ||
    type.includes("excel") ||
    type.includes("powerpoint") ||
    type.includes("officedocument") ||
    name.endsWith(".doc") ||
    name.endsWith(".docx") ||
    name.endsWith(".xls") ||
    name.endsWith(".xlsx") ||
    name.endsWith(".ppt") ||
    name.endsWith(".pptx")
  ) return FileText;

  return File;
}

export const FileUpload = forwardRef(
  (
    {
      variant = "dropzone", // "dropzone" | "button" | "avatar"
      multiple = false,
      accept = "",
      maxSize = Infinity, // in bytes
      maxFiles = Infinity,
      onFilesChange,
      simulateUpload = true,
      disabled = false,
      className,
      value, // In case controlled list is passed
    },
    ref
  ) => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState(false);
    const [errorAlert, setErrorAlert] = useState("");
    
    const fileInputRef = useRef(null);
    const uploadIntervalsRef = useRef({});

    // Clean up mock upload intervals on unmount
    useEffect(() => {
      return () => {
        Object.values(uploadIntervalsRef.current).forEach(clearInterval);
      };
    }, []);

    // Sync with value if controlled (optional)
    useEffect(() => {
      if (value) {
        setFiles(value);
      }
    }, [value]);

    const handleFilesStateChange = (newFilesList) => {
      setFiles(newFilesList);
      if (onFilesChange) {
        onFilesChange(newFilesList);
      }
    };

    // Helper: validate files
    const validateFiles = (incomingFiles) => {
      let valid = [];
      let errorMessage = "";

      // Check max files limit
      if (files.length + incomingFiles.length > maxFiles) {
        errorMessage = `You can only upload up to ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
        return { valid: [], error: errorMessage };
      }

      for (let f of incomingFiles) {
        // Size validation
        if (f.size > maxSize) {
          errorMessage = `File "${f.name}" exceeds the maximum size limit of ${formatBytes(maxSize)}.`;
          break;
        }

        // Accept validation
        if (accept) {
          const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase());
          const fileType = f.type.toLowerCase();
          const fileName = f.name.toLowerCase();
          
          const match = acceptedTypes.some((type) => {
            if (type.startsWith(".")) {
              return fileName.endsWith(type);
            }
            if (type.endsWith("/*")) {
              const base = type.replace("/*", "");
              return fileType.startsWith(base);
            }
            return fileType === type;
          });

          if (!match) {
            errorMessage = `File "${f.name}" is not an accepted format. Allowed: ${accept}.`;
            break;
          }
        }

        valid.push(f);
      }

      if (errorMessage) {
        return { valid: [], error: errorMessage };
      }

      return { valid, error: "" };
    };

    // Trigger mock upload simulation
    const startSimulatedUpload = (fileId) => {
      if (!simulateUpload) return;

      let progressVal = 0;
      
      const interval = setInterval(() => {
        progressVal += Math.floor(Math.random() * 15) + 8; // Random speed increments
        if (progressVal >= 100) {
          progressVal = 100;
          clearInterval(uploadIntervalsRef.current[fileId]);
          delete uploadIntervalsRef.current[fileId];
          
          setFiles((prev) => {
            const next = prev.map((f) =>
              f.id === fileId ? { ...f, progress: 100, status: "success" } : f
            );
            if (onFilesChange) onFilesChange(next);
            return next;
          });
        } else {
          setFiles((prev) => {
            const next = prev.map((f) =>
              f.id === fileId ? { ...f, progress: progressVal } : f
            );
            if (onFilesChange) onFilesChange(next);
            return next;
          });
        }
      }, 250);

      uploadIntervalsRef.current[fileId] = interval;
    };

    const processAddedFiles = (rawFilesList) => {
      if (disabled) return;
      setErrorAlert("");

      const incoming = Array.from(rawFilesList);
      
      // If singular avatar or multiple=false, replace current list or slice
      let updatedIncoming = incoming;
      if (!multiple || variant === "avatar") {
        updatedIncoming = incoming.slice(0, 1);
      }

      const { valid, error } = validateFiles(updatedIncoming);

      if (error) {
        setErrorAlert(error);
        return;
      }

      // Format new file elements
      const newFileItems = valid.map((file) => {
        const id = Math.random().toString(36).substring(2, 9) + Date.now();
        const isImage = file.type.startsWith("image/");
        const previewUrl = isImage ? URL.createObjectURL(file) : null;

        return {
          id,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          progress: simulateUpload ? 0 : 100,
          status: simulateUpload ? "uploading" : "success",
          previewUrl,
          error: ""
        };
      });

      let nextFiles = [];
      if (multiple && variant !== "avatar") {
        nextFiles = [...files, ...newFileItems];
      } else {
        // Clean up previous URLs to prevent memory leaks
        files.forEach((f) => {
          if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
        });
        nextFiles = newFileItems;
      }

      handleFilesStateChange(nextFiles);

      // Start upload animation for each new item
      newFileItems.forEach((item) => {
        startSimulatedUpload(item.id);
      });
    };

    // Remove file handler
    const removeFile = (id) => {
      if (disabled) return;

      // Cancel upload interval if active
      if (uploadIntervalsRef.current[id]) {
        clearInterval(uploadIntervalsRef.current[id]);
        delete uploadIntervalsRef.current[id];
      }

      const fileToRemove = files.find((f) => f.id === id);
      if (fileToRemove?.previewUrl) {
        URL.revokeObjectURL(fileToRemove.previewUrl);
      }

      const filtered = files.filter((f) => f.id !== id);
      handleFilesStateChange(filtered);
    };

    // Input file select trigger
    const onFileInputChange = (e) => {
      if (e.target.files && e.target.files.length > 0) {
        processAddedFiles(e.target.files);
        // Reset file input value so same file can be uploaded again if deleted
        e.target.value = "";
      }
    };

    const triggerFileBrowser = () => {
      if (disabled) return;
      fileInputRef.current?.click();
    };

    // Drag-and-drop event handlers
    const handleDragEnter = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(true);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(true);
    };

    const handleDragLeave = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(false);
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (disabled) return;
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processAddedFiles(e.dataTransfer.files);
      }
    };

    // Auto-clear global error alerts after 6 seconds
    useEffect(() => {
      if (errorAlert) {
        const timer = setTimeout(() => {
          setErrorAlert("");
        }, 6000);
        return () => clearTimeout(timer);
      }
    }, [errorAlert]);

    // RENDER METRICS & ALERTS
    const renderAlert = () => (
      <AnimatePresence>
        {errorAlert && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2.5 p-3 rounded-lg border border-red-200 bg-red-50/70 text-red-800 dark:border-red-900/30 dark:bg-red-950/20 dark:text-red-400 text-xs shadow-sm w-full"
          >
            <AlertTriangle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-semibold">Validation Error</span>
              <p className="mt-0.5 leading-relaxed">{errorAlert}</p>
            </div>
            <button
              onClick={() => setErrorAlert("")}
              className="p-0.5 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500/80 hover:text-red-700 dark:text-red-400/80 dark:hover:text-red-300"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );

    const renderFileList = () => {
      if (files.length === 0) return null;

      return (
        <div className="w-full space-y-2 mt-4 max-h-60 overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {files.map((fileRecord) => {
              const FileIcon = getFileIcon(fileRecord.file);
              const isUploading = fileRecord.status === "uploading";
              
              return (
                <motion.div
                  key={fileRecord.id}
                  initial={{ opacity: 0, height: 0, y: 12 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -12 }}
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-lg shadow-sm">
                    {/* Preview Thumbnail or File Icon */}
                    {fileRecord.previewUrl ? (
                      <div className="h-10 w-10 rounded-md border border-slate-200 dark:border-slate-800 overflow-hidden shrink-0 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
                        <img
                          src={fileRecord.previewUrl}
                          alt="Thumbnail preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-10 w-10 rounded-md bg-slate-100 dark:bg-slate-850 text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-800/50">
                        <FileIcon className="h-5 w-5" />
                      </div>
                    )}

                    {/* Meta information & progress bars */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h4 className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate pr-2">
                          {fileRecord.name}
                        </h4>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0 font-medium font-mono">
                          {formatBytes(fileRecord.size)}
                        </span>
                      </div>

                      {isUploading ? (
                        <div className="flex items-center gap-2">
                          {/* Animated progress slider */}
                          <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-blue-500 dark:bg-blue-400 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${fileRecord.progress}%` }}
                              transition={{ duration: 0.1 }}
                            />
                          </div>
                          <span className="text-[9px] font-bold font-mono text-blue-500 dark:text-blue-400 shrink-0 w-8 text-right">
                            {fileRecord.progress}%
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                          Ready to upload
                        </div>
                      )}
                    </div>

                    {/* Action button */}
                    <div className="shrink-0 flex items-center gap-1">
                      {isUploading && (
                        <Loader2 className="h-4 w-4 text-blue-500 animate-spin mr-1 shrink-0" />
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(fileRecord.id)}
                        className="p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors cursor-pointer"
                        title="Remove file"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      );
    };

    // HIDDEN FILE INPUT COMPONENT
    const inputElement = (
      <input
        type="file"
        ref={fileInputRef}
        onChange={onFileInputChange}
        multiple={multiple && variant !== "avatar"}
        accept={accept}
        disabled={disabled}
        className="hidden"
      />
    );

    // ==========================================
    // VARIANT 1: DRAG & DROP ZONE
    // ==========================================
    if (variant === "dropzone") {
      return (
        <div className={cn("w-full flex flex-col gap-3", className)}>
          {inputElement}
          
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileBrowser}
            className={cn(
              "relative flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 text-center cursor-pointer select-none overflow-hidden transition-all duration-300",
              // Idle light/dark mode
              "bg-white border-slate-200 dark:bg-slate-950 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700",
              // Glow backgrounds
              "after:absolute after:inset-0 after:-z-10 after:bg-radial-gradient after:from-blue-500/5 after:to-transparent after:opacity-0 after:transition-opacity after:duration-300 hover:after:opacity-100",
              // Dragging active states
              isDragging && "border-blue-500 dark:border-blue-400 bg-blue-50/10 dark:bg-blue-950/10 ring-2 ring-blue-500/20 scale-[1.01] shadow-md",
              // Disabled states
              disabled && "opacity-40 cursor-not-allowed hover:border-slate-200 dark:hover:border-slate-800 hover:after:opacity-0"
            )}
            ref={ref}
          >
            {/* Visual drag element transitions */}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div
                className={cn(
                  "p-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 transition-all duration-300 shadow-sm",
                  isDragging && "bg-blue-500 text-white border-blue-400 scale-110 rotate-3 dark:bg-blue-500"
                )}
              >
                <UploadCloud className="h-6 w-6" />
              </div>

              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                  <span className="text-blue-600 dark:text-blue-400 hover:underline">
                    Click to upload
                  </span>{" "}
                  or drag and drop
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-medium">
                  {accept ? accept.toUpperCase() : "Any files"}{" "}
                  {maxSize !== Infinity && `up to ${formatBytes(maxSize)}`}
                </p>
              </div>
            </div>

            {/* Micro background grid details for visual complexity */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]" />
          </div>

          {renderAlert()}
          {renderFileList()}
        </div>
      );
    }

    // ==========================================
    // VARIANT 2: COMPACT BUTTON TRIGGER
    // ==========================================
    if (variant === "button") {
      return (
        <div className={cn("w-full flex flex-col gap-3", className)}>
          {inputElement}
          
          <div className="flex items-center gap-3" ref={ref}>
            <button
              type="button"
              onClick={triggerFileBrowser}
              disabled={disabled}
              className={cn(
                "inline-flex items-center justify-center gap-2 rounded-md font-semibold text-sm h-10 px-4 py-2 transition-all cursor-pointer shadow-sm select-none border",
                "bg-slate-900 border-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:border-white dark:text-slate-950 dark:hover:bg-slate-100",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
                disabled && "opacity-50 pointer-events-none"
              )}
            >
              <UploadCloud className="h-4 w-4 shrink-0" />
              Choose File{multiple ? "s" : ""}
            </button>
            
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {files.length === 0
                ? `No file${multiple ? "s" : ""} selected`
                : `${files.length} file${files.length === 1 ? "" : "s"} selected`}
            </span>
          </div>

          {renderAlert()}
          {renderFileList()}
        </div>
      );
    }

    // ==========================================
    // VARIANT 3: AVATAR / CROPPER UPLOAD
    // ==========================================
    if (variant === "avatar") {
      const avatarFile = files[0];
      const isUploading = avatarFile?.status === "uploading";
      const hasImage = !!avatarFile?.previewUrl;

      return (
        <div className={cn("flex flex-col items-center gap-3", className)} ref={ref}>
          {inputElement}
          
          <div
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={triggerFileBrowser}
            className={cn(
              "relative h-28 w-28 rounded-full border-2 border-dashed border-slate-350 dark:border-slate-800 flex items-center justify-center cursor-pointer overflow-hidden transition-all duration-300 select-none",
              isDragging && "border-blue-500 dark:border-blue-400 bg-blue-50/10 dark:bg-blue-950/10 ring-4 ring-blue-500/10 scale-105",
              hasImage && "border-solid border-slate-200 dark:border-slate-800",
              disabled && "opacity-40 cursor-not-allowed"
            )}
          >
            {hasImage ? (
              <>
                {/* Active uploaded avatar image */}
                <img
                  src={avatarFile.previewUrl}
                  alt="Avatar Preview"
                  className="h-full w-full object-cover"
                />

                {/* Edit overlay state */}
                <div className="absolute inset-0 bg-slate-950/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 text-white gap-1 select-none">
                  <Camera className="h-4.5 w-4.5" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Change</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-slate-400 dark:text-slate-500 gap-1.5 p-2 text-center select-none">
                <Camera className="h-5 w-5" />
                <span className="text-[9px] font-bold uppercase tracking-wider leading-none">Upload Photo</span>
              </div>
            )}

            {/* Circular uploading loader screen overlay */}
            <AnimatePresence>
              {isUploading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 dark:bg-slate-950/80 flex flex-col items-center justify-center select-none"
                >
                  <Loader2 className="h-5 w-5 text-blue-500 animate-spin mb-1" />
                  <span className="text-[9px] font-bold font-mono text-blue-600 dark:text-blue-400">
                    {avatarFile.progress}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Quick reset actions for single avatars */}
          {hasImage && !isUploading && (
            <motion.button
              type="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                removeFile(avatarFile.id);
              }}
              disabled={disabled}
              className="inline-flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 font-semibold bg-red-50 dark:bg-red-950/20 px-2.5 py-1 rounded-md cursor-pointer border border-red-200/20"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove Picture
            </motion.button>
          )}

          {renderAlert()}
        </div>
      );
    }

    return null;
  }
);

FileUpload.displayName = "FileUpload";
