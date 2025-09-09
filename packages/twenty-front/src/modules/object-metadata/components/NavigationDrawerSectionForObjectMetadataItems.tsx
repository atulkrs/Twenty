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
import { useLocation } from 'react-router-dom';
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
  const location = useLocation();

  const [isAtsOpen, setIsAtsOpen] = useState(false);
  const [atsClicked, setAtsClicked] = useState(false); // Track parent click

  // ATS subitems
  const atsSubItems = [
    '/ats/overview',
    '/ats/job-posting',
    '/ats/assessment',
    '/ats/interview-plan',
    '/ats/recruiter',
    '/ats/candidates',
    '/ats/reporting',
  ];

  // Determine which ATS subitem is selected
  const selectedAtsIndex = atsSubItems.findIndex((path) =>
    location.pathname.startsWith(path),
  );

  // ATS open if toggled or a subitem is selected
  const atsOpen = isAtsOpen || selectedAtsIndex !== -1;

  // ATS parent is active if clicked or a subitem is selected
  const atsParentActive = atsClicked || selectedAtsIndex !== -1;

  // Sort standard and custom object metadata items
  const sortedStandardObjectMetadataItems = [...objectMetadataItems]
    .filter((item) => ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
    .sort(
      (a, b) =>
        ORDERED_STANDARD_OBJECTS.indexOf(a.nameSingular) -
        ORDERED_STANDARD_OBJECTS.indexOf(b.nameSingular),
    );

  const sortedCustomObjectMetadataItems = [...objectMetadataItems]
    .filter((item) => !ORDERED_STANDARD_OBJECTS.includes(item.nameSingular))
    .sort((a, b) => (new Date(a.createdAt) < new Date(b.createdAt) ? 1 : -1));

  const objectMetadataItemsForNavigationItems = [
    ...sortedStandardObjectMetadataItems,
    ...sortedCustomObjectMetadataItems,
  ];

  const objectMetadataItemsForNavigationItemsWithReadPermission =
    objectMetadataItemsForNavigationItems.filter(
      (item) =>
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
                {/* Regular object item */}
                <div
                  onClick={() => setAtsClicked(false)} // reset ATS highlight when another item clicked
                >
                  <NavigationDrawerItemForObjectMetadataItem
                    objectMetadataItem={objectMetadataItem}
                  />
                </div>

                {/* ATS parent & submenu */}
                {objectMetadataItem.nameSingular === 'person' && (
                  <>
                    <NavigationDrawerItem
                      label="ATS"
                      Icon={IconBriefcase}
                      onClick={() => {
                        setIsAtsOpen(!isAtsOpen);
                        setAtsClicked(true);
                      }}
                      active={atsParentActive}
                    />

                    <AnimatedExpandableContainer
                      isExpanded={atsOpen}
                      dimension="height"
                      mode="fit-content"
                      containAnimation
                    >
                      {atsSubItems.map((path, index) => {
                        const labels = [
                          'Overview',
                          'Job posting',
                          'Assessment',
                          'Interview Plan',
                          'Recruiter',
                          'Candidates',
                          'Reporting',
                        ];
                        const icons = [
                          IconLayoutDashboard,
                          IconPhone,
                          IconClipboardCheck,
                          IconCalendarCheck,
                          IconUserStar,
                          IconUsers,
                          IconChartBar,
                        ];

                        const isSelected = index === selectedAtsIndex;

                        return (
                          <NavigationDrawerSubItem
                            key={path}
                            label={labels[index]}
                            to={path}
                            Icon={icons[index]}
                            indentationLevel={2}
                            subItemState={getNavigationSubItemLeftAdornment({
                              index,
                              arrayLength: atsSubItems.length,
                              selectedIndex: selectedAtsIndex,
                            })}
                            active={isSelected}
                          />
                        );
                      })}
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
