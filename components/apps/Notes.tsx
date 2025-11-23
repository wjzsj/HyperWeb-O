import React, { useState } from 'react';
import { Plus, ChevronLeft, Trash2 } from 'lucide-react';

interface Note {
  id: number;
  title: string;
  content: string;
  date: string;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, title: '购物清单', content: '牛奶\n鸡蛋\n面包', date: '2024/5/20' },
    { id: 2, title: '想法', content: '做一个Web OS...', date: '2024/5/21' }
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const openNote = (note: Note) => {
    setEditingId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const createNote = () => {
    const newId = Date.now();
    setNotes([{ id: newId, title: '新建笔记', content: '', date: new Date().toLocaleDateString('zh-CN') }, ...notes]);
    setEditingId(newId);
    setEditTitle('新建笔记');
    setEditContent('');
  };

  const saveAndClose = () => {
    if (editingId) {
      setNotes(notes.map(n => n.id === editingId ? { ...n, title: editTitle, content: editContent } : n));
    }
    setEditingId(null);
  };

  const deleteNote = () => {
    if (editingId) {
        setNotes(notes.filter(n => n.id !== editingId));
        setEditingId(null);
    }
  }

  return (
    <div className="h-full bg-[#f2f2f7] text-black flex flex-col">
      {editingId !== null ? (
        <>
          <div className="flex justify-between items-center p-4 bg-white border-b">
            <button onClick={saveAndClose} className="flex items-center text-yellow-600 gap-1 font-medium">
                <ChevronLeft size={20} /> 列表
            </button>
            <button onClick={deleteNote} className="text-red-500">
                <Trash2 size={20} />
            </button>
          </div>
          <div className="flex-1 p-6 bg-white flex flex-col gap-4">
             <input 
                className="text-3xl font-bold outline-none placeholder-gray-300" 
                value={editTitle} 
                onChange={e => setEditTitle(e.target.value)}
                placeholder="标题"
             />
             <textarea 
                className="flex-1 resize-none outline-none text-lg leading-relaxed placeholder-gray-300"
                value={editContent}
                onChange={e => setEditContent(e.target.value)}
                placeholder="输入内容..."
             />
          </div>
        </>
      ) : (
        <>
            <div className="p-6 pt-12 pb-4">
                <h1 className="text-4xl font-bold">笔记</h1>
                <p className="text-gray-500 text-sm mt-1">{notes.length} 条笔记</p>
            </div>
            <div className="px-4 flex-1 overflow-y-auto space-y-3 pb-8">
                {notes.map(note => (
                    <div 
                        key={note.id} 
                        onClick={() => openNote(note)}
                        className="bg-white p-4 rounded-xl shadow-sm active:scale-95 transition-transform cursor-pointer"
                    >
                        <h3 className="font-bold text-lg mb-1 truncate">{note.title}</h3>
                        <p className="text-gray-400 text-sm truncate">{note.content || "无内容"}</p>
                        <p className="text-gray-300 text-xs mt-2">{note.date}</p>
                    </div>
                ))}
            </div>
            <div className="absolute bottom-8 right-8">
                <button 
                    onClick={createNote}
                    className="w-14 h-14 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-yellow-500/30 hover:bg-yellow-400 transition-colors"
                >
                    <Plus size={32} />
                </button>
            </div>
        </>
      )}
    </div>
  );
};

export default Notes;