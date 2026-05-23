import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { WidgetType } from 'types/widget.types';
import { DashboardHeader, LeftPanel, Widget } from './components';
import styles from './dashboard.styles';
import { ItemsIdentifiersEnum } from './dashboard.types';
import { LegacyLockVault } from './index';
import { Transactions } from './widgets';

const dashboardWidgets: WidgetType[] = [
  {
    title: 'Legacy Lock Vault',
    widget: LegacyLockVault,
    description:
      'Lock your xEGLD for a chosen duration. The smart contract enforces the release only after the unlock timestamp has passed.',
    anchor: ItemsIdentifiersEnum.legacyLockVault,
    reference:
      'https://docs.multiversx.com/developers/developer-reference/sc-contract-calls/'
  },
  {
    title: 'Transaction History',
    widget: () => <Transactions identifier='transactions-all' />,
    description: 'All transactions for your connected wallet',
    anchor: ItemsIdentifiersEnum.transactionsAll,
    reference:
      'https://api.multiversx.com/#/accounts/AccountController_getAccountTransactions'
  }
];

export const Dashboard = () => {
  const [isMobilePanelOpen, setIsMobilePanelOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <div
        className={classNames(
          styles.mobilePanelContainer,
          styles.desktopPanelContainer
        )}
      >
        <LeftPanel
          isOpen={isMobilePanelOpen}
          setIsOpen={setIsMobilePanelOpen}
        />
      </div>

      <div
        style={{ backgroundImage: 'url(/background.svg)' }}
        className={classNames(styles.dashboardContent, {
          [styles.dashboardContentMobilePanelOpen]: isMobilePanelOpen
        })}
      >
        <DashboardHeader />

        <div className={styles.dashboardWidgets}>
          {dashboardWidgets.map((element) => (
            <Widget key={element.title} {...element} />
          ))}
        </div>
      </div>
    </div>
  );
};
