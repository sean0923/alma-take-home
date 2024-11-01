'use server';

import fs from 'fs';

export const uploadResume = async (props: { leadId: string; pdfFile: File }) => {
  const { leadId, pdfFile } = props;
  const data = await pdfFile.arrayBuffer();
  fs.appendFileSync(`./public/uploaded-resumes/${leadId}.pdf`, Buffer.from(data));
};
