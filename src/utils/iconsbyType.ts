import {
	CodeIcon,
	FontRomanIcon,
	EyeOpenIcon,
	MagicWandIcon,
	Link2Icon,
	CursorArrowIcon,
} from '@radix-ui/react-icons';

const IconByType: any = {
	loaded: [CodeIcon, '#66CCCC'],
	pageview: [EyeOpenIcon, '#FFFF66'],
	init: [MagicWandIcon, 'lightgreen'],
	external_link_click: [Link2Icon, '#ddd'],
	default: [FontRomanIcon, '#ddd'],
};

export default IconByType;
