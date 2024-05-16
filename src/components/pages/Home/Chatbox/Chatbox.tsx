'use client';

import {Telegram} from '@/assets/icons';
import Field from '@/components/commons/Field/Field';
import Image from 'next/image';
import React, {MouseEventHandler} from 'react';

import styles from './styles.module.scss';

interface ChatboxProps extends React.HTMLAttributes<HTMLDivElement> {
  bubbleBackgoundColor: string | undefined;
}

const DEFAULT_CHAT = [
  {
    type: 'image',
    content:
      'https://assets.mofoprod.net/network/images/Wysa-logo.original.jpg',
  },
  {
    type: 'text',
    content: "Hello! I'm a chatbot. How can I help you today?",
  },
  {
    type: 'text',
    content: "I'm Wysa - an AI built by therapists.",
  },
  {
    type: 'text',
    content:
      "I'm here to help you with your mental health, 24/7, anytime you need me.",
  },
];

const Chatbox: React.FC<ChatboxProps> = ({
  bubbleBackgoundColor,
  className,
  ...rest
}) => {
  const [chat, setChat] = React.useState(DEFAULT_CHAT);

  const chatboxRef = React.useRef<HTMLDivElement | null>(null);
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSubmit = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.preventDefault();

    const input = inputRef.current;
    if (input) {
      setChat([...chat, {type: 'text', content: input.value}]);
      input.value = '';
    }
  };

  // Scroll to the bottom of the chatbox when a new message is added
  React.useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [chat]);

  // Focus on the input field when the component mounts
  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={chatboxRef}
      className={`${styles.chatbox} ${className}`}
      {...rest}
    >
      {chat.map((message, idx) => {
        const {type, content} = message ?? {};

        return (
          <div
            className={`${styles.bubble} ${idx > DEFAULT_CHAT.length - 1 ? styles.user : styles.bot}`}
            style={{
              backgroundColor: bubbleBackgoundColor,
              animationDelay:
                idx > DEFAULT_CHAT.length - 1 ? '0s' : `${idx * 0.3}s`,
              transform:
                idx > DEFAULT_CHAT.length - 1
                  ? 'translateX(100%)'
                  : 'translateX(-100%)',
            }}
            key={content + idx}
          >
            {type === 'image' ? (
              <Image src={content} alt={content} width={150} height={150} />
            ) : (
              <p>{content}</p>
            )}
          </div>
        );
      })}
      <form onSubmit={handleSubmit}>
        <Field
          inputRef={inputRef}
          label=''
          type='text'
          placeholder='Type your message here...'
          required
          className={styles.input}
          style={{
            backgroundColor: bubbleBackgoundColor,
          }}
          icon={
            <Telegram
              role='button'
              aria-label='Send message'
              type='submit'
              onClick={handleSubmit}
            />
          }
        />
      </form>
    </div>
  );
};

export default Chatbox;
