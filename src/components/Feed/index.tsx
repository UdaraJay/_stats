import styles from './Feed.module.scss';
import moment from 'moment';
import { useMemo } from 'react';
import IconByType from '@/utils/iconsbyType';
import { useTable } from 'react-table';

function Table({ data, columns }: { data: any; columns: any }) {
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	return (
		<table className={styles.table} {...getTableProps()}>
			<thead>
				{headerGroups.map((headerGroup: any, i: number) => (
					<tr {...headerGroup.getHeaderGroupProps()} key={`head-${i}`}>
						{headerGroup.headers.map((column: any, j: number) => (
							<th {...column.getHeaderProps()} key={`head2-${j}`}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map((row: any, i: number) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()} key={`cell-${i}`}>
							{row.cells.map((cell: any, j: number) => {
								return (
									<td {...cell.getCellProps()} key={`cell2-${j}`}>
										{cell.render('Cell')}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
}

const RealtimeFeed = ({ events }: { events: [] }) => {
	const renderIcon = (type: string) => {
		const Icon = IconByType.hasOwnProperty(type)
			? IconByType[type][0]
			: IconByType.default[0];
		const color = IconByType.hasOwnProperty(type)
			? IconByType[type][1]
			: IconByType.default[1];

		return <Icon className={styles.icon} style={{ color: color }} />;
	};

	const total = events.length;

	const columns = useMemo(
		() => [
			{
				Header: 'host',
				accessor: 'host',
			},
			{
				Header: 'type',
				accessor: 'type',
			},
			{
				Header: 'path',
				accessor: 'pathname',
			},
			{
				Header: 'location',
				accessor: 'location',
			},
			{
				Header: 'timestamp',
				accessor: 'timestamp',
			},
		],
		[]
	);

	const data = useMemo(
		() =>
			events.map((event: any, i) => {
				const url = new URL(event.url);

				const newEvent = {
					...event,
					type: (
						<>
							{renderIcon(event.type)}{' '}
							<span className={styles.txt}>{event.type}</span>
						</>
					),
					pathname: url.pathname,
					host: url.host,
					location: `${event.country} / ${event.city}`,
					timestamp: moment(event.timestamp).fromNow(),
				};

				return newEvent;
			}),
		[events]
	);

	return (
		<div className={styles.realtime}>
			<div className={styles.heading}>Realtime logs</div>
			<div className={styles.tableWrapper}>
				<Table data={data} columns={columns} />
			</div>
		</div>
	);
};

export default RealtimeFeed;
