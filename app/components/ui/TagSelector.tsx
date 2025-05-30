"use client"
import React, { useState } from "react";

interface TagSelectorProps {
  tags: string[];
  onTagsChange: (selectedTags: string[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, onTagsChange }) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="flex gap-3 flex-wrap">
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => toggleTag(tag)}
          className={`border px-3 py-2 rounded-[20px] border-[rgba(12,135,214,1)] border-solid
            ${selectedTags.includes(tag) ? "bg-[rgba(12,135,214,0.1)]" : ""}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default TagSelector;
