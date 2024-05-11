import FeatherIcon from '@/components/FeatherIcon/FeatherIcon';
import {useProgrammeEventsHook} from '@/hooks/use-programmeEvents.hooks';
import DashboardLayout, {IDashboardBreadcrumb} from '@/layouts/dashboard.layout';
import {Box, SxProps} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import CardActivityInformation from './ui/CardActivityInformation';
import ModalConfirm, {IModalConfirmProps} from './ui/ModalConfirm';

const ActivityDetailsUI: React.FC = () => {
  const {idProgramme} = useParams();
  const {programmeEventDetail, programmeEventRegister, programmeEventCancelWithdraw} =
    useProgrammeEventsHook({
      idProgramme: idProgramme,
    });
  const {data: dataProgrammeEventDetail} = programmeEventDetail({idProgramme: idProgramme ?? ''});
  const [breadcrumbs, setBreadcrumbs] = useState<IDashboardBreadcrumb[]>([
    {type: 'icon', content: <FeatherIcon icon='home' />, href: ''},
    {type: 'text', content: 'Upcoming Events', href: '/dashboard/upcoming'},
    {type: 'text', content: '', href: ''},
  ]);

  const [modalConfirm, setModalConfirm] = useState<IModalConfirmProps>({
    show: false,
    title: '',
    description: '',
    color: 'info',
    onClose: () => setHideModalConfirm(),
    onConfirm: () => null,
  });

  useEffect(() => {
    if (breadcrumbs[2].content === '') {
      let tmpBreadcrumbs = [...breadcrumbs];
      tmpBreadcrumbs[2].content = dataProgrammeEventDetail?.programmeEvent.Name;
      setBreadcrumbs(tmpBreadcrumbs);
    }
  }, [idProgramme, dataProgrammeEventDetail, breadcrumbs]);

  const setHideModalConfirm = () => {
    setModalConfirm({
      ...modalConfirm,
      show: false,
    });
  };

  const onRegister = () => {
    setModalConfirm({
      ...modalConfirm,
      show: true,
      color: 'info',
      title: `Registering for ${dataProgrammeEventDetail?.programmeEvent.Name}`,
      description: 'Are you sure you’d like to register?',
      onConfirm: () => {
        if (idProgramme) {
          programmeEventRegister.reset();
          programmeEventRegister.mutate({programmeEventID: idProgramme});
        }
        setHideModalConfirm();
      },
    });
  };

  const onWithdrawCancel = (status: 'withdraw' | 'cancel') => {
    setModalConfirm({
      ...modalConfirm,
      show: true,
      color: 'error',
      title: `Are you sure you want to ${status} this activity?`,
      description: 'You will be opted out from this activity',
      onConfirm: () => {
        if (idProgramme && dataProgrammeEventDetail?.participantData?.Id) {
          programmeEventCancelWithdraw.reset();
          programmeEventCancelWithdraw.mutate({
            programmeEventID: idProgramme,
            participantId: dataProgrammeEventDetail?.participantData?.Id,
            status: status,
          });
        }
        setHideModalConfirm();
      },
    });
  };

  return (
    <Box>
      <DashboardLayout title='Activity Details' withBackBtn breadCrumbs={breadcrumbs}>
        <DashboardLayout.Content>
          <CardActivityInformation
            data={dataProgrammeEventDetail}
            onRegister={onRegister}
            onWithdrawCancel={onWithdrawCancel}
            loadingSubmit={
              programmeEventRegister.isLoading || programmeEventCancelWithdraw.isLoading
            }
          />
        </DashboardLayout.Content>
      </DashboardLayout>
      <ModalConfirm
        show={modalConfirm.show}
        onClose={modalConfirm.onClose}
        title={modalConfirm.title}
        description={modalConfirm.description}
        color={modalConfirm.color}
        onConfirm={modalConfirm.onConfirm}
      />
    </Box>
  );
};

export default ActivityDetailsUI;
