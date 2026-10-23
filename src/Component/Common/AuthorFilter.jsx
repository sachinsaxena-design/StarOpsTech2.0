import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, User } from "lucide-react";

const AUTHORS = [
  { id: "ansul", name: "Ansul Tiwari" },
  { id: "alkesh", name: "Alkesh Tiwari" },
  { id: "dewang", name: "Dewang Sharma" },
  { id: "divyanshu", name: "Divyanshu Verma" },
  { id: "sachin", name: "Sachin Saxena" },
];

function getInitials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

function AuthorFilter({ selectedAuthor, setSelectedAuthor, searchParams, setSearchParams }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = AUTHORS.find((a) => a.id === selectedAuthor);

  function handleSelect(id) {
    setSelectedAuthor(id);
    setOpen(false);

    const params = new URLSearchParams(searchParams);
    params.delete("page");
    if (id) {
      params.set("author", id);
    } else {
      params.delete("author");
    }
    setSearchParams(params);
  }
// 005fe3
  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-gray-300 bg-white pl-2 pr-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        {selected ? (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-semibold text-indigo-700">
            {getInitials(selected.name)}
          </span>
        ) : (
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <User size={14} />
          </span>
        )}
        <span>{selected ? selected.name : "All writer"}</span>
        <ChevronDown
          size={16}
          className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute z-10 mt-2 w-56 origin-top-left rounded-xl border border-gray-100 bg-white p-1 shadow-lg animate-in fade-in slide-in-from-top-1 duration-150">
          <button
            type="button"
            onClick={() => handleSelect("")}
            className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-400">
              <User size={14} />
            </span>
            All writer
            {!selectedAuthor && <Check size={16} className="ml-auto text-indigo-600" />}
          </button>

          <div className="my-1 h-px bg-gray-100" />

          {AUTHORS.map((author) => (
            <button
              key={author.id}
              type="button"
              onClick={() => handleSelect(author.id)}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-indigo-50"
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-semibold text-indigo-700">
                {getInitials(author.name)}
              </span>
              {author.name}
              {selectedAuthor === author.id && (
                <Check size={16} className="ml-auto text-indigo-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorFilter;