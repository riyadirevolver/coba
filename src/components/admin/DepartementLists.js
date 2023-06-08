import {
	Box,
	Button,
	CardContent,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";
import { EditJobLevel, getJobLevel } from "../../../lib/services/joblevel";
import DashboardCard from "../baseCard/DashboardCard";

import AddJobLevelModal from "../modal/job-level/AddJobLevelModal";
import ThreeDotsMenu from "../menu-items/ThreeDotsMenu";
import useHandleModal from "../../hooks/useHandleModal";
import EditJobLevelModal from "../modal/job-level/EditJobLevelModal";
import DeleteJobLevelModal from "../modal/job-level/DeleteJobLevelModal";

export async function getServerSideProps({ query }) {
	const users = await getJobLevel();
	return {
		props: {
			users,
		},
	};
}

const DepartementLists = ({ data }) => {
	//  membuat treedots
	const { openModal, modalType, handleCloseModal, handleOpenModal } =
		useHandleModal(false);

	// const [dataJobLevelEdit, setDataJobLevelEdit] = React.useState({});

	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const [dataJobLevelEdit, setDataJobLevelEdit] = React.useState({});
	const [dataJobLevelDelete, setDataJobLevelDelete] = React.useState({});

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	// const jobLevelEdit = (levelData) => {
	// 	if (levelData) {
	// 		setDataJobLevelEdit(levelData);
	// 		handleOpenModal("edit");
	// 	}
	// 	return;
	// };

	// const jobLevelDelete = (levelData) => {
	// 	if (levelData) {
	// 		setDataJobLevelDelete(levelData);
	// 		handleOpenModal("delete");
	// 	}
	// 	return;
	// };

	return (
		<DashboardCard
			title="Jabatan"
			subtitle=""
			customdisplay="block"
			custommargin="10px"
		>
			<AddJobLevelModal
				open={openModal}
				type={modalType}
				closeModalHandler={handleCloseModal}
			/>
			<Box sx={{ mb: 2 }}>
				<Button
					color="primary"
					variant="contained"
					onClick={() => handleOpenModal("add")}
				>
					Tambah
				</Button>
			</Box>
			<Box
				sx={{
					overflow: "auto",
					width: "100%",
				}}
			>
				<Table
					aria-label="simple table"
					sx={{
						whiteSpace: "nowrap",
						width: "100%",
					}}
				>
					<TableHead>
						<TableRow>
							<TableCell>
								<Typography variant="h5" textAlign="center">Tambah Jabatan</Typography>
							</TableCell>

							<TableCell>
								<Typography variant="h5" textAlign="center">Level Jabatan</Typography>
							</TableCell>

							<TableCell>
								<Typography align="center" variant="h5" textAlign="center">
									Actions
								</Typography>
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{data.data.map((joblevel) => (
							<TableRow key={joblevel.id}>
								<TableCell>
									<Typography variant="h5" fontWeight="600" textAlign="center">
										{joblevel.name}
									</Typography>
								</TableCell>

								<TableCell>
									<Typography variant="h5" fontWeight="600" textAlign="center">
										{joblevel.level}
									</Typography>
								</TableCell>

								<TableCell align="center">
									<ThreeDotsMenu
										data={joblevel}
										token={data}
										onClickEdit={() => jobLevelEdit(joblevel)}
										onClickDelete={() => jobLevelDelete(joblevel)}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
				<TablePagination
					rowsPerPageOptions={[5, 10, 25]}
					component="div"
					count={data.total}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
					labelDisplayedRows={({ from, to, count }) => {
						return `Menampilkan ${from}-${to} dari ${
							count != -1 ? count : `more than ${to}`
						} data`;
					}}
				/>
			</Box>

			<EditJobLevelModal
				open={openModal}
				type={modalType}
				data={dataJobLevelEdit}
				closeModalHandler={handleCloseModal}
			/>

			<DeleteJobLevelModal 
			open={openModal} 
			type={modalType} 
			data={dataJobLevelDelete}
			closeModalHandler={handleCloseModal} 
			/>
		</DashboardCard>
	);
};

export default DepartementLists;