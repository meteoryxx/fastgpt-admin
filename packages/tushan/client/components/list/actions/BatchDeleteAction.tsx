import { Button, Message, Popconfirm, Tooltip } from '@arco-design/web-react';
import { IconDelete } from '@arco-design/web-react/icon';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteMany } from '../../../api';
import { useResourceContext } from '../../../context/resource';
import { useBatchSelectedIdsContext } from '../context';

export const ListBatchDeleteAction: React.FC = React.memo((props) => {
  const resource = useResourceContext();
  const [deleteMany] = useDeleteMany();
  const { t } = useTranslation();
  const selectedIds = useBatchSelectedIdsContext();

  return (
    <Popconfirm
      focusLock
      position="tr"
      title={t('tushan.list.deleteTitle')}
      content={t('tushan.list.deleteDesc')}
      onOk={async () => {
        try {
          await deleteMany(resource, {
            ids: selectedIds,
          });

          Message.info({
            content: t('tushan.list.deleteSuccess'),
          });
        } catch (err) {
          console.error(err);
          Message.error({
            content: t('tushan.common.operateFailed'),
          });
        }
      }}
    >
      <Tooltip content={t('tushan.list.batchDelete')}>
        <Button icon={<IconDelete />} />
      </Tooltip>
    </Popconfirm>
  );
});
ListBatchDeleteAction.displayName = 'ListBatchDeleteAction';
