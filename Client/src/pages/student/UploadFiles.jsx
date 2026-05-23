import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  downloadFile,
  fetchProject,
  uploadFiles,
} from "../../store/slices/studentSlice";
import { Archive, File, FileText, FileCode, FilePlus } from "lucide-react";

const UploadFiles = () => {
  const dispatch = useDispatch();
  const { project, files } = useSelector((state) => state.student);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const reportRef = useRef(null);
  const presRef = useRef(null);
  const codeRef = useRef(null);

  useEffect(() => {
    if (!project) {
      dispatch(fetchProject());
    }
  }, [dispatch]);

  const handleFilePick = (e) => {
    const list = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...list]);
    e.target.value = "";
  };

  const handleUpload = (e) => {
    if (selectedFiles.length === 0) return;
    dispatch(uploadFiles({ projectId: project?._id, files: selectedFiles }));
    setSelectedFiles([]);
  };

  const removeSelected = (name) => {
    setSelectedFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    const Icon = ({ className }) => <File className={className} />;
    const color =
      extension === "pdf"
        ? "text-[#f47373]"
        : ["doc", "docx"].includes(extension)
          ? "text-[#00e560]"
          : ["ppt", "pptx"].includes(extension)
            ? "text-yellow-400"
            : "text-[#5a8a72]";
    return <File className={`w-8 h-8 ${color}`} />;
  };

  const handleDownloadFile = async (file) => {
    const res = await dispatch(
      downloadFile({ projectId: project._id, fileId: file._id }),
    ).then((res) => {
      const { blob } = res.payload;
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", file.name || "download");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="space-y-6">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">Upload Project Files</h1>
          <p className="card-subtitle">
            Upload your project documents including reports, presentations, and
            code files.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="border-2 border-dashed border-[rgba(0,229,96,0.2)] rounded-xl p-6 text-center hover:border-[#00e560] transition-colors bg-[#0c1210]">
            <div className="mb-4">
              <FileText className="w-12 h-12 text-[#5a8a72] mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-[#c8f5e0] mb-2">Report</h3>
            <p className="text-sm text-[#5a8a72] mb-4">
              Upload your project report (PDF, DOC)
            </p>
            <label className="btn-outline cursor-pointer inline-block">
              Choose File
              <input
                type="file"
                ref={reportRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFilePick}
                multiple
              />
            </label>
          </div>

          <div className="border-2 border-dashed border-[rgba(0,229,96,0.2)] rounded-xl p-6 text-center hover:border-[#00e560] transition-colors bg-[#0c1210]">
            <div className="mb-4">
              <Archive className="w-12 h-12 text-[#5a8a72] mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-[#c8f5e0] mb-2">
              Presentation
            </h3>
            <p className="text-sm text-[#5a8a72] mb-4">
              Upload your presentation (PPT, PPTX, PDF)
            </p>
            <label className="btn-outline cursor-pointer inline-block">
              Choose File
              <input
                type="file"
                ref={presRef}
                className="hidden"
                accept=".ppt,.pptx,.pdf"
                onChange={handleFilePick}
                multiple
              />
            </label>
          </div>

          <div className="border-2 border-dashed border-[rgba(0,229,96,0.2)] rounded-xl p-6 text-center hover:border-[#00e560] transition-colors bg-[#0c1210]">
            <div className="mb-4">
              <FileCode className="w-12 h-12 text-[#5a8a72] mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-[#c8f5e0] mb-2">
              Code Files
            </h3>
            <p className="text-sm text-[#5a8a72] mb-4">
              Upload your source code (ZIP, RAR, TAR)
            </p>
            <label className="btn-outline cursor-pointer inline-block">
              Choose File
              <input
                type="file"
                ref={codeRef}
                className="hidden"
                accept=".zip,.rar,.tar,.gz"
                onChange={handleFilePick}
                multiple
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <button onClick={handleUpload} className="btn-primary">
            Upload Selected Files
          </button>
        </div>
      </div>

      {selectedFiles.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Ready to Upload</h2>
          </div>

          <div className="space-y-3">
            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-4 bg-[#0c1210] rounded-xl border border-[rgba(0,229,96,0.1)]"
              >
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.name)}
                  <div>
                    <p className="font-medium text-[#c8f5e0] text-sm">
                      {file.name}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-[#5a8a72] mt-0.5">
                      <span>{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                    </div>
                  </div>
                </div>

                <button
                  className="btn-danger btn-small"
                  onClick={() => removeSelected(file.name)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Uploaded Files</h2>
          <p className="card-subtitle">Manage your uploaded project files</p>
        </div>

        {(files || []).length === 0 ? (
          <div className="text-center py-4">
            <FilePlus className="w-16 h-16 text-[#2a5a42] mx-auto mb-4" />
            <p className="text-[#5a8a72] text-sm">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map((file) => (
              <div
                key={file._id || file.fileUrl}
                className="flex items-center justify-between p-4 bg-[#0c1210] rounded-xl border border-[rgba(0,229,96,0.1)]"
              >
                <div className="flex items-center space-x-4">
                  {getFileIcon(file.originalName)}
                  <div>
                    <p className="font-medium text-[#c8f5e0] text-sm">
                      {file.originalName}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-[#5a8a72] mt-0.5">
                      <span>{file.fileType || "File"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    className="btn-outline btn-small"
                    onClick={() => handleDownloadFile(file)}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFiles;
