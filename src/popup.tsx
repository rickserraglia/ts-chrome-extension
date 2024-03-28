import '@/styles/globals.css';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewSchedule } from '@/tabs/new-schedule';
import { Schedules } from '@/tabs/schedules';
import { Settings } from '@/tabs/settings';

interface Tab {
	value: string;
	label: string;
	Content: () => JSX.Element;
}

const tabs: Tab[] = [
	{ value: 'schedules', label: 'Schedules', Content: () => <Schedules /> },
	{
		value: 'new-schedule',
		label: 'New Schedule',
		Content: () => <NewSchedule />,
	},
	{ value: 'settings', label: 'Settings', Content: () => <Settings /> },
];

function IndexPopup() {
	return (
		<div className="flex flex-1 justify-center max-h-screen">
			<Tabs defaultValue={tabs[0].value}>
				<TabsList>
					{tabs.map((tab) => (
						<TabsTrigger key={tab.value} value={tab.value}>
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
				<div className="flex-1 flex items-center justify-center">
					{tabs.map(({ value, Content }) => (
						<TabsContent key={value} value={value}>
							<Content key={value} />
						</TabsContent>
					))}
				</div>
			</Tabs>
		</div>
	);
}

export default IndexPopup;
