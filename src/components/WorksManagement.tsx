import React, { useState } from 'react';
import { Trash2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import type { Article } from '../types/article';
import { ConfirmDialog } from './ConfirmDialog';
import { Toast } from './Toast';

interface WorksManagementProps {
  selectedWorks: Article[];
  onDeleteWorks: (workIds: number[]) => void;
  onClearSelection: () => void;
}

export function WorksManagement({ 
  selectedWorks, 
  onDeleteWorks,
  onClearSelection 
}: WorksManagementProps) {
  const { language } = useLanguage();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleDelete = async () => {
    try {
      await onDeleteWorks(selectedWorks.map(work => work.id));
      setToastMessage(language === 'ja' 
        ? '選択した作品を削除しました'
        : 'Selected works have been deleted');
      setShowToast(true);
      onClearSelection();
    } catch (error) {
      setToastMessage(language === 'ja'
        ? '削除中にエラーが発生しました'
        : 'An error occurred while deleting');
      setShowToast(true);
    }
    setShowConfirm(false);
  };

  if (selectedWorks.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4">
      <div className="flex items-center gap-2 text-gray-600">
        <AlertCircle className="w-5 h-5" />
        <span>
          {language === 'ja'
            ? `${selectedWorks.length}件の作品を選択中`
            : `${selectedWorks.length} works selected`}
        </span>
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
        {language === 'ja' ? '削除' : 'Delete'}
      </button>

      <button
        onClick={onClearSelection}
        className="px-4 py-2 text-gray-600 hover:text-gray-900"
      >
        {language === 'ja' ? 'キャンセル' : 'Cancel'}
      </button>

      <ConfirmDialog
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title={language === 'ja' ? '作品の削除' : 'Delete Works'}
        message={language === 'ja'
          ? '選択した作品を削除してもよろしいですか？この操作は取り消せません。'
          : 'Are you sure you want to delete the selected works? This action cannot be undone.'}
      />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={toastMessage}
      />
    </div>
  );
}