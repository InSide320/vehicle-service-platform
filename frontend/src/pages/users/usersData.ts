export type UserStatus = "Активний" | "На перевірці" | "Заблокований";

export interface UserRecord {
	id: string;
	name: string;
	email: string;
	phone: string;
	vehicles: number;
	status: UserStatus;
	lastEvent: string;
	initials: string;
}

export const initialUsers: UserRecord[] = [
	{
		id: "USR-0482",
		name: "Олександр Коваленко",
		email: "o.kovalenko@fleetmq.ua",
		phone: "+380 (67) 412-88-90",
		vehicles: 2,
		status: "Активний",
		lastEvent: "ТО через 5 днів",
		initials: "ОК",
	},
	{
		id: "USR-0291",
		name: "Марія Шевченко",
		email: "m.shevchenko@logistik.ua",
		phone: "+380 (50) 934-12-45",
		vehicles: 4,
		status: "Активний",
		lastEvent: "Штраф #4821",
		initials: "МШ",
	},
	{
		id: "USR-0714",
		name: "Дмитро Бондаренко",
		email: "d.bondarenko@trans.kiev.ua",
		phone: "+380 (93) 215-67-01",
		vehicles: 1,
		status: "На перевірці",
		lastEvent: "Верифікація документів",
		initials: "ДБ",
	},
	{
		id: "USR-0328",
		name: "Ірина Мельник",
		email: "i.melnyk@autoline.ua",
		phone: "+380 (63) 780-33-19",
		vehicles: 3,
		status: "Активний",
		lastEvent: "Страховку оновлено",
		initials: "ІМ",
	},
	{
		id: "USR-0509",
		name: "Андрій Ткаченко",
		email: "a.tkachenko@cargo.ua",
		phone: "+380 (97) 551-04-82",
		vehicles: 2,
		status: "Активний",
		lastEvent: "ТО через 12 днів",
		initials: "АТ",
	},
	{
		id: "USR-0613",
		name: "Наталія Савченко",
		email: "n.savchenko@fleet.ua",
		phone: "+380 (66) 222-14-08",
		vehicles: 0,
		status: "Заблокований",
		lastEvent: "Акаунт заблоковано",
		initials: "НС",
	},
	{
		id: "USR-0207",
		name: "Тарас Гнатюк",
		email: "t.hnatiuk@cargo.ua",
		phone: "+380 (99) 471-33-26",
		vehicles: 1,
		status: "Активний",
		lastEvent: "Реєстрацію підтверджено",
		initials: "ТГ",
	},
	{
		id: "USR-0185",
		name: "Вікторія Кравець",
		email: "v.kravets@trans.ua",
		phone: "+380 (68) 310-45-11",
		vehicles: 3,
		status: "На перевірці",
		lastEvent: "Очікує перевірки",
		initials: "ВК",
	},
	{
		id: "USR-0772",
		name: "Роман Лисенко",
		email: "r.lysenko@fleet.ua",
		phone: "+380 (95) 810-22-41",
		vehicles: 2,
		status: "Активний",
		lastEvent: "Нагадування доставлено",
		initials: "РЛ",
	},
	{
		id: "USR-0391",
		name: "Олена Петренко",
		email: "o.petrenko@logistik.ua",
		phone: "+380 (73) 905-11-64",
		vehicles: 0,
		status: "Активний",
		lastEvent: "Профіль створено",
		initials: "ОП",
	},
];
