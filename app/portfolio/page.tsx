import Giscus from '@/components/Giscus';
import PostContentBody from '@/components/shared/PostContentBody';
import Title from '@/components/shared/Title';

export default function Portfolio() {
  const pdfUrl = '__portfolio/portfolio.pdf'; // PDF 파일의 웹 접근 경로

  return (
    <>
      <Title title='포트폴리오' />
      <div className='relative gap-8 lg:flex'>
        <article className='w-full prose prose-neutral md:max-w-none font-spoqa dark:prose-dark'>
          <PostContentBody
            content={
              <iframe
                src={pdfUrl}
                width='100%'
                height='1000'
                style={{ border: 'none' }}
                title='Portfolio PDF'></iframe>
            }
          />
        </article>
      </div>
      <Giscus />
    </>
  );
}

{
  /**/
}

{
  /*  */
}
