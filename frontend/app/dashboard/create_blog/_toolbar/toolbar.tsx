import { Editor } from "@tiptap/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  AlignCenter,
  AlignLeft,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListOrdered,
  Subscript,
  Superscript,
  UnderlineIcon,
} from "lucide-react";

const ToolBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) return null;

  const handleButtonClick = (callback: () => void) => {
    callback();
    return false;
  };

  return (
    <div className="border-b p-2 flex flex-wrap gap-1">
      {/* bold */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("bold") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() => editor.chain().focus().toggleBold().run())
            }
          >
            <Bold />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bold Text</TooltipContent>
      </Tooltip>

      {/* italic */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("italic") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleItalic().run()
              )
            }
          >
            <Italic />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Italic Text</TooltipContent>
      </Tooltip>

      {/* underline */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("underline") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleUnderline().run()
              )
            }
          >
            <UnderlineIcon />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Underline</TooltipContent>
      </Tooltip>

      {/* heading v1 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              editor.isActive("heading", { level: 1 }) ? "default" : "outline"
            }
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              )
            }
          >
            <Heading1 />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Heading 1</TooltipContent>
      </Tooltip>

      {/* heading v2 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "outline"
            }
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              )
            }
          >
            <Heading2 />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Heading 2</TooltipContent>
      </Tooltip>

      {/* heading v3 */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={
              editor.isActive("heading", { level: 2 }) ? "default" : "outline"
            }
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              )
            }
          >
            <Heading3 />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Heading 3</TooltipContent>
      </Tooltip>

      {/* superscript */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("superscript") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleSuperscript().run()
              )
            }
          >
            <Superscript />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Superscript</TooltipContent>
      </Tooltip>

      {/* subscript */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("subscript") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleSubscript().run()
              )
            }
          >
            <Subscript />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Heading 2</TooltipContent>
      </Tooltip>

      {/* bullet list */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={editor.isActive("bulletList") ? "default" : "outline"}
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleBulletList().run()
              )
            }
          >
            <List />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bullet List</TooltipContent>
      </Tooltip>

      {/* ordered list */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().toggleOrderedList().run()
              )
            }
            variant={editor.isActive("orderedList") ? "default" : "outline"}
          >
            <ListOrdered />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Ordered List</TooltipContent>
      </Tooltip>

      {/* align left */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().setTextAlign("left").run()
              )
            }
          >
            <AlignLeft />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Left Aligb</TooltipContent>
      </Tooltip>

      {/* align center */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().setTextAlign("center").run()
              )
            }
          >
            <AlignCenter />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Center Align</TooltipContent>
      </Tooltip>

      {/* align right */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            type="button"
            size="sm"
            onClick={() =>
              handleButtonClick(() =>
                editor.chain().focus().setTextAlign("right").run()
              )
            }
          >
            <AlignCenter />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Center Align</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ToolBar;
