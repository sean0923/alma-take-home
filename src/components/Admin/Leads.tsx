'use client';

import { ddjs } from '@/utils/ddjs';
import { clientDb } from '@/utils/firebase-client';
import { LeadSchemaType, leadStatusKeyToLabel } from '@/utils/lead-schema';
import { Group, Select, Table, TextInput } from '@mantine/core';
import { onSnapshot, query, collection, where, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import { SelectLeadStatus } from './SelectLeadStatus';
import { IconSearch } from '@tabler/icons-react';
import Fuse from 'fuse.js';

export const Leads = () => {
  const [leads, setLeads] = useState<LeadSchemaType[]>([]);

  const [targetStatus, setTargetStatus] = useState('');

  const [searchText, setSearchText] = useState('');

  const fuse = new Fuse(leads, { keys: ['first_name', 'last_name'] });
  const leadSearchResults =
    searchText === '' ? leads : fuse.search(searchText).map((item) => item.item);

  useEffect(() => {
    let q = query(collection(clientDb, 'leads'), orderBy('created_at', 'desc'));

    if (!targetStatus) {
      q = query(q, where('status', 'in', ['PENDING', 'REACHED_OUT']));
    } else {
      q = query(q, where('status', 'in', [targetStatus]));
    }

    const unsub = onSnapshot(q, (docResp) => {
      const tempLeads: LeadSchemaType[] = [];
      docResp.docs.forEach((item) => {
        const tempEmployee = { ...item.data(), id: item.id } as LeadSchemaType;
        tempLeads.push(tempEmployee);
      });
      setLeads(tempLeads);
    });

    return () => unsub();
  }, [targetStatus]);

  return (
    <div className="p-8">
      <h2 className="mb-8 text-2xl font-bold">Leads</h2>

      <Group mb="sm">
        <TextInput
          placeholder="Search"
          leftSection={<IconSearch />}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <Select
          clearable
          className="w-40"
          placeholder="Status"
          value={targetStatus}
          data={Object.entries(leadStatusKeyToLabel).map(([value, label]) => {
            return { value, label };
          })}
          onChange={async (value) => {
            if (!value) return;
            setTargetStatus(value);
          }}
          onClear={() => {
            setTargetStatus('');
          }}
        />
      </Group>

      <Table withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Submitted</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Country</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {leadSearchResults.map((lead) => {
            const { id, created_at, country_of_citizenship, first_name, last_name } = lead;

            return (
              <Table.Tr key={id}>
                <Table.Td>
                  {first_name} {last_name}
                </Table.Td>
                <Table.Td>{ddjs(created_at).format('MM/DD/YYYY hh:mm A')}</Table.Td>
                <Table.Td>
                  <SelectLeadStatus lead={lead} />
                </Table.Td>
                <Table.Td>{country_of_citizenship}</Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
};
