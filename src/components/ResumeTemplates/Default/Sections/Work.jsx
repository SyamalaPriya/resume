import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { makeStyles } from '@material-ui/core/styles';
import { IntlContext } from 'gatsby-plugin-intl';

const useStyles = makeStyles((theme) => ({
    resumeWork: {
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
    },
    works: {
        margin: '0',
        padding: '0',
        listStyle: 'none',
        '& li': {
            margin: '0 0 10px 0',
            '&:last-child': {
                margin: '3px 0 0',
            },
        },
    },
    position: { fontWeight: 'bold' },
    positionDate: {
        fontStyle: 'italic',
        fontSize: '0.8rem',
    },
    url: {},
    summary: {
        whiteSpace: 'break-spaces',
    },
    highlights: {
        flexWrap: 'wrap',
        listStyle: 'none',
        paddingLeft: 0,
        display: 'inline-flex',
        '& li': {
            fontStyle: 'italic',
            margin: '3px 3px 0 0',
            backgroundColor: theme.palette.type === 'dark' ? '#28407b' : '#dae4f4',
            borderRadius: '3px',
            padding: '1px 3px',
        },
    },
    contentWrapper: {
        marginLeft: '4px',
    },
    workWrapper: {
        pageBreakInside: 'avoid',
    },
}));

const Work = ({ work: works }) => {
    const classes = useStyles();
    const intl = useContext(IntlContext);

    return works.length > 0 && (
        <div className={classes.resumeWork}>
            <h3>
                {intl.formatMessage({ id: 'experience' })}
            </h3>
            <div className={classes.contentWrapper}>
                <ul className={classes.works}>
                    {works.map((work) => {
                        if (work?.enabled) {
                            const {
                                name,
                                location,
                                description,
                                position,
                                url,
                                startDate,
                                endDate,
                                summary,
                                highlights,
                            } = work?.value || {};

                            return (
                                <li className={classes.workWrapper} key={uuid()}>
                                    <p className={classes.position}>
                                        {position?.enabled && position?.value}
                                        {(
                                            (position?.enabled && name?.enabled)
                                            && (position?.value && name?.value)
                                        ) && ` ${intl.formatMessage({ id: 'at' })} `}
                                        {name?.enabled && name?.value}
                                        {description?.enabled && description?.value}
                                        {location?.enabled && location?.value}
                                        {(startDate?.enabled || endDate?.enabled) && (
                                            <span className={classes.positionDate}>
                                                {' ('}
                                                {startDate?.enabled && startDate?.value}
                                                {(startDate?.enabled && endDate?.enabled) && ' - '}
                                                {endDate?.enabled && endDate?.value}
                                                {')'}
                                            </span>
                                        )}
                                    </p>
                                    <p className={classes.url}>
                                        {url?.enabled && (
                                            <a href={url?.value}>
                                                {url?.value}
                                            </a>
                                        )}
                                    </p>
                                    <p className={classes.summary}>
                                        {summary?.enabled && summary?.value}
                                    </p>
                                    {highlights?.enabled && (
                                        <ul className={classes.highlights}>
                                            {highlights?.value.map((highlight) =>
                                                highlight?.enabled && (
                                                    <li key={uuid()}>
                                                        {highlight?.value}
                                                    </li>
                                                ))}
                                        </ul>
                                    )}
                                </li>
                            );
                        }

                        return null;
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Work;
