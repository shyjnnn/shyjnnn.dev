export interface TocProps {
  text: string;
  level: number;
}

/**
 * 마크다운 TOC 리스트 반환 메서드
 *
 * @param {string} text: 텍스트
 *
 * @returns {TocProps[]} 마크다운 TOC 리스트
 */
export function getMarkdownToc(text: string): TocProps[] {
  const list: TocProps[] = [];

  const temp = text.replace(/```[^]*?```/gm, '');

  const regex = /^(#{1,6}) (.+)$/gm;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = regex.exec(temp);

    // 일치하는 정규식이 없을 경우
    if (match === null) {
      break;
    }

    list.push({
      level: match[1].trim().length,
      text: match[2].trim(),
    });
  }

  return list;
}
