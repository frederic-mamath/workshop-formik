import React from 'react';
import { connect } from 'react-redux';

import styles from './{{ name }}.scss';

type PropsFromStore = {};

type Actions = {};

type {{ name }}Props = {};

type Props = {{ name }}Props  & PropsFromStore & Actions;

const mapStateToProps = (state: any) => state;

const actions = {};

const {{ name }} = ({  }: Props) => <div className={styles.view} />;

export default connect(mapStateToProps, actions)({{ name }});

