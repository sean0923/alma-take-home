'use client';

import { clientDb } from '@/utils/firebase-client';
import { LeadSchemaType, leadStatusKeyToLabel } from '@/utils/lead-schema';
import { Group, Select } from '@mantine/core';
import { doc, updateDoc } from 'firebase/firestore';

interface Props {
  lead: LeadSchemaType;
}

export const SelectLeadStatus = (props: Props) => {
  const { lead } = props;

  return (
    <Group>
      <Select
        value={lead.status}
        data={Object.entries(leadStatusKeyToLabel).map(([value, label]) => {
          return { value, label };
        })}
        onChange={async (value) => {
          if (!value) return;
          if (value === lead.status) return;
          await updateDoc(doc(clientDb, 'leads', lead.id), { status: value });
        }}
      />
    </Group>
  );
};
