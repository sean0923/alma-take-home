'use client';

import { notifyError } from '@/utils/notification-utils';
import { Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconFileTypePdf, IconUpload, IconX } from '@tabler/icons-react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  resumeFile: null | File;
  setResumeFile: Dispatch<SetStateAction<File | null>>;
}

export const ResumeDrop = (props: Props) => {
  const { resumeFile, setResumeFile } = props;

  return (
    <Dropzone
      onDrop={(files) => {
        const file = files[0] as File;
        setResumeFile(file);
      }}
      onReject={() => {
        notifyError('Cannot upload');
      }}
      maxSize={5 * 1024 ** 2}
      accept={[MIME_TYPES.pdf]}
      multiple={false}
    >
      <Group justify="center" style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <IconX />
        </Dropzone.Reject>

        <Dropzone.Idle>
          <IconFileTypePdf />
        </Dropzone.Idle>

        {!!resumeFile ? (
          <div>
            <div>{resumeFile.name}</div>
          </div>
        ) : (
          <div>
            <Text size="sm" inline>
              Drag PDF resume here or click to select file
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              A file should not exceed 5mb
            </Text>
          </div>
        )}
      </Group>
    </Dropzone>
  );
};
