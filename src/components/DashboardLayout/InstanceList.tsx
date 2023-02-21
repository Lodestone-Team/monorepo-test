import { faServer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { RadioGroup } from '@headlessui/react';
import InstanceLoadingPill from 'components/InstanceLoadingPill';
import InstanceLoadingCard from 'components/InstanceLoadingPill';
import InstancePill from 'components/InstancePill';
import { InstanceContext } from 'data/InstanceContext';
import { NotificationContext } from 'data/NotificationContext';
import { useUserLoggedIn } from 'data/UserInfo';
import { useContext, useEffect } from 'react';
import useAnalyticsEventTracker from 'utils/hooks';
import { match, otherwise } from 'variant';

export default function InstanceList({
  className = '',
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const gaEventTracker = useAnalyticsEventTracker('Instance List');
  const {
    instanceList: instances,
    selectedInstance,
    selectInstance,
    isReady,
  } = useContext(InstanceContext);
  const { ongoingNotifications } = useContext(NotificationContext);
  const userLoggedIn = useUserLoggedIn();

  useEffect(() => {
    if (!isReady) return;
    gaEventTracker(
      'View',
      'Instance List',
      true,
      Object.keys(instances).length
    );
  }, [isReady, instances]);

  return (
    <RadioGroup
      className={`mx-1 flex min-h-0 flex-col gap-y-1 overflow-y-auto px-1 child:w-full ${className}`}
      value={selectedInstance}
      onChange={selectInstance}
    >
      <RadioGroup.Label className="text-small font-bold leading-snug text-gray-faded/30">
        ALL INSTANCES
      </RadioGroup.Label>
      {userLoggedIn ? (
        instances &&
        Object.values(instances).map((instance) => (
          <RadioGroup.Option
            key={instance.uuid}
            value={instance}
            className="rounded-md outline-none child:w-full"
          >
            <InstancePill {...instance} />
          </RadioGroup.Option>
        ))
      ) : (
        <div
          className={`flex w-fit select-none flex-col items-stretch gap-4 rounded-xl border border-gray-faded/30 bg-gray-800 py-4 px-6 text-medium font-bold tracking-tight`}
        >
          <FontAwesomeIcon icon={faServer} className="text-h1 text-gray-400" />
          <p className="text-center text-h3 text-gray-400">
            Log in to view game server instances.
          </p>
        </div>
      )}
      {ongoingNotifications &&
        ongoingNotifications
          .map((notification) => {
            if (!notification.start_value) return null;
            if (notification.state === 'done') return null;
            return match(
              notification.start_value,
              otherwise(
                {
                  InstanceCreation: ({ instance_uuid }) => (
                    <InstanceLoadingPill
                      key={instance_uuid}
                      progress_percent={
                        notification.total
                          ? notification.progress / notification.total
                          : undefined
                      }
                    />
                  ),
                },
                (_) => null
              )
            );
          })
          .reverse()}
      {children}
    </RadioGroup>
  );
}
