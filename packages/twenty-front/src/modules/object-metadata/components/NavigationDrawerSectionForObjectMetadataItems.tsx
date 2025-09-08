import { NavigationDrawerItemForObjectMetadataItem } from '@/object-metadata/components/NavigationDrawerItemForObjectMetadataItem';
import { type ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { getObjectPermissionsForObject } from '@/object-metadata/utils/getObjectPermissionsForObject';
import { useObjectPermissions } from '@/object-record/hooks/useObjectPermissions';
import { NavigationDrawerAnimatedCollapseWrapper } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerAnimatedCollapseWrapper';
import { NavigationDrawerItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerItem';
import { NavigationDrawerSection } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSection';
import { NavigationDrawerSectionTitle } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSectionTitle';
import { NavigationDrawerSubItem } from '@/ui/navigation/navigation-drawer/components/NavigationDrawerSubItem';

import { useNavigationSection } from '@/ui/navigation/navigation-drawer/hooks/useNavigationSection';
import { getNavigationSubItemLeftAdornment } from '@/ui/navigation/navigation-drawer/utils/getNavigationSubItemLeftAdornment';
import {
  IconBriefcase,
  IconCalendarCheck,
  IconChartBar,
  IconClipboardCheck,
  IconLayoutDashboard,
  IconPhone,
  IconUsers,
  IconUserStar,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { AnimatedExpandableContainer } from 'twenty-ui/layout';

const ORDERED_STANDARD_OBJECTS = [
  'person',
  'company',
  'opportunity',
  'task',
  'note',
];

type NavigationDrawerSectionForObjectMetadataItemsProps = {
  sectionTitle: string;
  isRemote: boolean;
  objectMetadataItems: ObjectMetadataItem[];
};

export const NavigationDrawerSectionForObjectMetadataItems = ({
  sectionTitle,
  isRemote,
  objectMetadataItems,
}: NavigationDrawerSectionForObjectMetadataItemsProps) => {
  const { toggleNavigationSection, isNavigationSectionOpenState } =
    useNavigationSection('Objects' + (isRemote ? 'Remote' : 'Workspace'));
  const isNavigationSectionOpen = useRecoilValue(isNavigationSectionOpenState);
  const { objectPermissionsByObjectMetadataId } = useObjectPermissions();

  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [isCandidatesOpen, setIsCandidatesOpen] = useState(false);

  const sortedStandardObjectMetadataItems = [...objectMetadataItems]
    .filter((item) => ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
    .sort((a, b) => {
      const indexA = ORDERED_STANDARD_OBJECTS.indexOf(a.nameSingular);
      const indexB = ORDERED_STANDARD_OBJECTS.indexOf(b.nameSingular);

      if (indexA === -1 || indexB === -1) {
        return a.nameSingular.localeCompare(b.nameSingular);
      }
      return indexA - indexB;
    });

  const sortedCustomObjectMetadataItems = [...objectMetadataItems]
    .filter((item) => !ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
    .sort((a, b) => {
      return new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1;
    });

  const objectMetadataItemsForNavigationItems = [
    ...sortedStandardObjectMetadataItems,
    ...sortedCustomObjectMetadataItems,
  ];

  const objectMetadataItemsForNavigationItemsWithReadPermission =
    objectMetadataItemsForNavigationItems.filter((item) =>
      getObjectPermissionsForObject(
        objectPermissionsByObjectMetadataId,
        item.id,
      ).canReadObjectRecords,
    );

  return (
    objectMetadataItems.length > 0 && (
      <NavigationDrawerSection>
        <NavigationDrawerAnimatedCollapseWrapper>
          <NavigationDrawerSectionTitle
            label={sectionTitle}
            onClick={() => toggleNavigationSection()}
          />
        </NavigationDrawerAnimatedCollapseWrapper>

        {isNavigationSectionOpen &&
          objectMetadataItemsForNavigationItemsWithReadPermission.map(
            (objectMetadataItem) => (
              <div key={`navigation-drawer-item-${objectMetadataItem.id}`}>
                <NavigationDrawerItemForObjectMetadataItem
                  objectMetadataItem={objectMetadataItem}
                />

                {objectMetadataItem.nameSingular === 'person' && (
                  <>
                    <NavigationDrawerItem
                      label="ATS"
                      Icon={IconBriefcase}
                      onClick={() => setIsAtsOpen(!isAtsOpen)}
                    />

                    <AnimatedExpandableContainer
                      isExpanded={isAtsOpen}
                      dimension="height"
                      mode="fit-content"
                      containAnimation
                    >
                      <NavigationDrawerSubItem
                        label="Overview"
                        to="/ats/overview"
                        Icon={IconLayoutDashboard}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 0,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                      <NavigationDrawerSubItem
                        label="Job posting"
                        to="/ats/job-posting"
                        Icon={IconPhone}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 1,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                      <NavigationDrawerSubItem
                        label="Assessment"
                        to="/ats/assessment"
                        Icon={IconClipboardCheck}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 2,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                      <NavigationDrawerSubItem
                        label="Interview Plan"
                        to="/ats/interview-plan"
                        Icon={IconCalendarCheck}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 3,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                      <NavigationDrawerSubItem
                        label="Recruiter"
                        to="/ats/recruiter"
                        Icon={IconUserStar}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 4,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                      <NavigationDrawerSubItem
                        label="Candidates"
                        Icon={IconUsers}
                        onClick={() => setIsCandidatesOpen(!isCandidatesOpen)}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 5,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />

                     

                      <NavigationDrawerSubItem
                        label="Reporting"
                        to="/ats/reporting"
                        Icon={IconChartBar}
                        indentationLevel={2}
                        subItemState={getNavigationSubItemLeftAdornment({
                          index: 6,
                          arrayLength: 7,
                          selectedIndex: -1,
                        })}
                      />
                    </AnimatedExpandableContainer>
                  </>
                )}
              </div>
            ),
          )}
      </NavigationDrawerSection>
    )
  );
};
