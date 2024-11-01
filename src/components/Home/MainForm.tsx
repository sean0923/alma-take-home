'use client';

import { leadSchema, LeadSchemaType } from '@/utils/lead-schema';
import { notifyError } from '@/utils/notification-utils';
import { Button, Checkbox, Select, Textarea, TextInput } from '@mantine/core';
import { createId } from '@paralleldrive/cuid2';
import { FormEvent, useState } from 'react';
import { LuDice5, LuFile, LuHeart, LuInfo } from 'react-icons/lu';
import { ResumeDrop } from './ResumeDrop';
import { clientDb } from '@/utils/firebase-client';
import { setDoc, doc } from 'firebase/firestore';
import { uploadResume } from '@/server-actions/upload-resume-action';
import { allCountries } from '@/data/all-countries';
import { useRouter } from 'next/navigation';

const iconSize = 60;

export const MainForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [resumeFile, setResumeFile] = useState<null | File>(null);

  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      if (!resumeFile) throw new Error('Please upload your resume in PDF format');

      const formData = new FormData(e.currentTarget);

      const visa_type_o1 = formData.get('visa_type_o1') ? 'O_1' : '';
      const visa_type_eb1a = formData.get('visa_type_eb1a') ? 'EB_1A' : '';
      const visa_type_eb2 = formData.get('visa_type_eb2') ? 'EB_2_NIW' : '';
      const visa_type_not_sure = formData.get('visa_type_not_sure') ? 'NOT_SURE' : '';

      const visa_types = [visa_type_o1, visa_type_eb1a, visa_type_eb2, visa_type_not_sure].filter(
        (type) => !!type
      );

      const tempLead: LeadSchemaType = {
        id: createId(),
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        email: formData.get('email') as string,
        country_of_citizenship: formData.get('country_of_citizenship') as string,
        linked_in: formData.get('linked_in') as string,
        visa_types: visa_types as LeadSchemaType['visa_types'],
        answer_to_how_can_we_help: formData.get('first_name') as string,
        status: 'PENDING',
        created_at: Date.now(),
      };

      const parsedLead = leadSchema.parse(tempLead);

      await setDoc(doc(clientDb, 'leads', parsedLead.id), parsedLead);

      await uploadResume({ leadId: parsedLead.id, pdfFile: resumeFile });

      router.push('/thank-you');
    } catch (error) {
      notifyError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mx-auto max-w-xl text-center" onSubmit={handleSubmit}>
      {/* form1 */}
      <div className="mb-12">
        <div className="my-8 flex flex-col items-center">
          <LuInfo color="#7D7CFF" size={iconSize} />

          <h3 className="my-4 text-xl font-bold">Want to understand your visa options?</h3>

          <div className="text-lg font-semibold leading-tight">
            Submit the form below and our team of experienced attorneys will review your information
            and send a preliminary assessment of your case based on your goals.
          </div>
        </div>

        {/* inputs */}
        <div className="mx-auto max-w-sm space-y-3">
          <TextInput name="first_name" placeholder="First Name" />
          <TextInput name="last_name" placeholder="Last Name" />
          <TextInput name="email" type="email" placeholder="Email" />
          <Select
            searchable
            name="country_of_citizenship"
            placeholder="Country of Citizenship"
            data={allCountries}
          />
          <TextInput name="linked_in" placeholder="LinkedIn / Personal Website URL" />
        </div>
      </div>

      {/* form2 */}
      <div className="mb-12">
        <div className="mb-4 flex flex-col items-center">
          <LuDice5 color="#7D7CFF" size={iconSize} />

          <h3 className="my-4 text-xl font-bold">Visa categories of interest?</h3>
        </div>

        {/* inputs */}
        <div className="mx-auto max-w-sm space-y-3">
          <Checkbox name="visa_type_o1" label="O-1" />
          <Checkbox name="visa_type_eb1a" label="EB-1A" />
          <Checkbox name="visa_type_eb2" label="EB-2 NIW" />
          <Checkbox name="visa_type_not_sure" label="I don't know" />
        </div>
      </div>

      <div className="mb-12">
        <div className="mx-auto max-w-sm">
          <div className="mb-4 flex flex-col items-center">
            <LuFile color="#7D7CFF" size={iconSize} />

            <h3 className="my-4 text-xl font-bold">Upload your resume</h3>
          </div>

          <ResumeDrop resumeFile={resumeFile} setResumeFile={setResumeFile} />
        </div>
      </div>

      {/* form3 */}
      <div className="mb-12">
        <div className="flex flex-col items-center">
          <LuHeart color="#7D7CFF" size={iconSize} />

          <h3 className="my-4 text-xl font-bold">How can we help you?</h3>
        </div>

        {/* inputs */}
        <div className="mx-auto max-w-sm space-y-3">
          <Textarea
            autosize
            name="answer_to_how_can_we_help"
            placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations?"
            minRows={7}
          />
        </div>
      </div>

      <div className="mx-auto max-w-sm">
        <Button disabled={isLoading} loading={isLoading} type="submit" color="dark" fullWidth>
          Submit
        </Button>
      </div>
    </form>
  );
};
