'use client';

import { FormEvent, useEffect, useState } from 'react';
import { fetchComments, postComment } from '@/services/api';
import { RootState, useAppSelector } from '@/store';
import { Comment } from '@/types/types';

function CommentDetails({ title, body }: { title: string, body: string }) {
  return (
    <div className={'flex flex-col justify-center content-center mb-8'}>
      <h3 className={'font-bold mb-2'}>{title}</h3>
      <p>{body}</p>
    </div>
  )
}

function NewComment({ onPost, deviceId }: { onPost: Function, deviceId: number }) {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ title, setTitle ] = useState<string>('');
  const [ body, setBody ] = useState<string>('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!jwt) return;
    await postComment(jwt, { title, body, deviceId });
    setTitle('');
    setBody('');
    if (onPost) onPost();
  }

  return (
    <form onSubmit={handleSubmit} className={'flex flex-col mt-5 w-1/3 box-border border-t-2 border-blue-950 pt-5'}>
      <h3 className={'font-bold mb-5'}>New Comment</h3>
      <input type={'text'} name={'title'} placeholder={'Title'} className={'p-3 bg-blue-50 w-full rounded-lg outline-0 mb-3'} value={title} onChange={(e: React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}/>
      <textarea name={'body'} placeholder={'Enter your comment...'} className={'p-2 bg-blue-50 w-full rounded-lg h-[100px] resize-none outline-0 mb-3'} value={body} onChange={(e: React.FormEvent<HTMLTextAreaElement>) => setBody(e.currentTarget.value)}/>
      <input type={'submit'} value={'Envoyer'} className={'w-[200px] p-3 bg-blue-950 text-blue-50 rounded-lg hover:cursor-pointer box-border'}/>
    </form>
  );
}

export default function Comments({ deviceId }: { deviceId: number }) {
  const jwt = useAppSelector((state: RootState) => state.user.jwt);
  const [ comments, setComments ] = useState<Comment[]>([]);

  async function _fetchComments() {
    if (!jwt) return;
    const data = await fetchComments(jwt, deviceId);
    if (data?.data) {
      const comments = data.data as Comment[];
      setComments(comments);
    }
  }

  useEffect(() => {
    _fetchComments();
  }, []);

  return (
    <div className={'max-h-[75%] p-10 flex flex-col mt-7 w-full p-5 bg-white rounded-xl mb-5 box-border'}>
      <h2 className={'text-xl font-bold mb-5'}>Commentaires</h2>
      <ul className={'overflow-y-scroll p-2 border-t-2 border-blue-950 pt-3'}>
        {comments.map((c) => <CommentDetails key={c.id} title={c.attributes.title} body={c.attributes.body} />)}
      </ul>
      <NewComment onPost={() => _fetchComments()} deviceId={deviceId} />
    </div>
  )
}
