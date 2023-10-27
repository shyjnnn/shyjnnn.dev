import { TableOfContents } from '@/types/components/data.types';

export function getMarkdownToc(text: string): TableOfContents[] {
  const list: TableOfContents[] = [];

  // 정규식 패턴: Strong 형식 제거
  const removeStrongPattern = /(\*\*|__)(.*?)\1/g;

  // 정규식 패턴: 링크 형식 제거
  const removeLinkPattern = /\[([^\]]*)\]\([^)]*\)/g;

  // 일반 텍스트에서 strong 및 링크 형식을 제거
  const textWithoutStrongAndLinks = text
    .replace(removeStrongPattern, '$2')
    .replace(removeLinkPattern, '$1');

  const temp = textWithoutStrongAndLinks.replace(/```[^]*?```/gm, '');

  const regex = /^(#{1,6}) (.+)$/gm;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = regex.exec(temp);

    // 일치하는 정규식이 없을 경우
    if (match === null) {
      break;
    }

    const text = match[2].trim();

    list.push({
      level: match[1].trim().length,
      text,
    });
  }

  return list;
}
