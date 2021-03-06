// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Modal} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import Permissions from 'mattermost-redux/constants/permissions';
import {getCurrentUser} from 'mattermost-redux/selectors/entities/users';

import TeamPermissionGate from 'components/permissions_gates/team_permission_gate';
import MemberListTeam from 'components/member_list_team';
import InvitationModal from 'components/invitation_modal';

import {ModalIdentifiers} from 'utils/constants';
import store from 'stores/redux_store.jsx';
import * as Utils from 'utils/utils.jsx';

const getState = store.getState;

type Props = {
    currentTeam: {
        id: string;
        display_name: string;
    };
    onHide: () => void;
    onLoad?: () => void;
    actions: {
        openModal: (modalData: {modalId: string; dialogType: any}) => Promise<{
            data: boolean;
        }>;
    };
}

type State = {
    show: boolean;
}

export default class TeamMembersModal extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            show: true,
        };
    }

    componentDidMount() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    handleHide = () => {
        this.setState({show: false});
    }

    handleExit = () => {
        this.props.onHide();
    }

    handleInvitePeople = () => {
        const {actions} = this.props;

        actions.openModal({
            modalId: ModalIdentifiers.INVITATION,
            dialogType: InvitationModal,
        });

        this.handleExit();
    }

    render() {
        // find if current user is system admin
        const state = getState();
        const currentUser = getCurrentUser(state);
        const isSysAdmin = Utils.isSystemAdmin(currentUser.roles);

        let teamDisplayName = '';
        if (this.props.currentTeam) {
            teamDisplayName = this.props.currentTeam.display_name;
        }

        return (
            <Modal
                dialogClassName='a11y__modal more-modal'
                show={this.state.show}
                onHide={this.handleHide}
                onExited={this.handleExit}
                role='dialog'
                aria-labelledby='teamMemberModalLabel'
                id='teamMembersModal'
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title
                        componentClass='h1'
                        id='teamMemberModalLabel'
                    >
                        <FormattedMessage
                            id='team_member_modal.members'
                            defaultMessage='{team} Members'
                            values={{
                                team: teamDisplayName,
                            }}
                        />
                    </Modal.Title>
                    <TeamPermissionGate
                        teamId={this.props.currentTeam.id}
                        permissions={[Permissions.ADD_USER_TO_TEAM, Permissions.INVITE_GUEST]}
                    >
                        {isSysAdmin ? <button
                                id='invitePeople'
                                type='button'
                                className='btn btn-primary invite-people-btn'
                                onClick={this.handleInvitePeople}
                            >

                                <FormattedMessage
                                    id='team_member_modal.invitePeople'
                                    defaultMessage='Invite People'
                                />
                        </button> : ""}
                    </TeamPermissionGate>
                </Modal.Header>
                <Modal.Body>
                    <MemberListTeam
                        teamId={this.props.currentTeam.id}
                    />
                </Modal.Body>
            </Modal>
        );
    }
}
