import { useDispatch } from 'react-redux';
import { AppDispatch, RootState, useSelector } from 'src/redux/store';
import { useEffect, useState } from 'react';
import memoApi from 'src/api/memoApi';
import { setAllMemoData } from 'src/redux/features/memoSlice';
import { AxiosError } from 'axios';
import { MemoEntity } from 'src/util/memo.type';

type EmojiType = {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
  emoticons: string[];
};

export const useEmojiPicker = (memoData: MemoEntity | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const allMemoData = useSelector((state: RootState) => state.memo.allData);

  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState<boolean>(false);
  const [selectedMemoData, setSelectedMemoData] = useState<MemoEntity | null>(null);

  // toggle show Emoji Picker
  const showEmojiPicker = () => setIsShowEmojiPicker(!isShowEmojiPicker);

  // selected Emoji & update memo data
  const selectedEmoji = async (props: EmojiType) => {
    if (!selectedMemoData) return;

    const tmpCodeArr: string[] = props.unified.split('-');
    const emojiCodeArr: number[] = tmpCodeArr.map((code: string) => Number('0x' + code));
    const emoji = String.fromCodePoint(...emojiCodeArr);
    const updatedMemoData = { ...selectedMemoData, ...{ icon: emoji } };

    try {
      // update memo data
      const { data } = await memoApi.update(updatedMemoData._id as string, updatedMemoData);
      // update current memo data
      setSelectedMemoData(updatedMemoData);
      // update all memo data
      const newAllMemo = allMemoData.map((memo: MemoEntity) =>
        memo._id === data._id ? updatedMemoData : memo,
      );
      dispatch(setAllMemoData(newAllMemo));
    } catch (error: unknown) {
      if (error instanceof AxiosError) alert(error.message);
    } finally {
      setIsShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (memoData) setSelectedMemoData(memoData);
  }, [memoData]);

  return { isShowEmojiPicker, selectedMemoData, showEmojiPicker, selectedEmoji };
};
