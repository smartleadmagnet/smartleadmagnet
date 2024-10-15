import classNames from "classnames";
import * as React from "react";

export const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={classNames("w-full caption-bottom text-sm", className)} {...rest} />
    </div>
  );
});

export const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <thead ref={ref} className={classNames("[&_tr]:border-b", className)} {...rest} />;
  }
);

export const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <tbody ref={ref} className={classNames("[&_tr:last-child]:border-0", className)} {...rest} />;
  }
);

export const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <tfoot
        ref={ref}
        className={classNames("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className)}
        {...rest}
      />
    );
  }
);

export const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <tr
        ref={ref}
        className={classNames(
          "border-b transition-colors",
          "hover:bg-muted/50",
          "data-[state=selected]:bg-muted",
          className
        )}
        {...rest}
      />
    );
  }
);

export const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <th
        ref={ref}
        className={classNames(
          "text-muted-foreground h-12 px-4 text-left align-middle font-medium",
          "[&:has([role=checkbox])]:pr-0",
          className
        )}
        {...rest}
      />
    );
  }
);

export const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <td ref={ref} className={classNames("p-4 align-middle", "[&:has([role=checkbox])]:pr-0", className)} {...rest} />
    );
  }
);

export const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  (props, ref) => {
    const { className, ...rest } = props;

    return <caption ref={ref} className={classNames("text-muted-foreground mt-4 text-sm", className)} {...rest} />;
  }
);

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableHead.displayName = "TableHead";
TableCell.displayName = "TableCell";
TableCaption.displayName = "TableCaption";
