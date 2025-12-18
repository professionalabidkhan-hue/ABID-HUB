import argparse
from typing import List
from src.request_processor import ProcessingStats

class CLIHandler:
    @staticmethod
    def parse_args():
        """
        Parse command line arguments.
        Returns:
            Namespace with request_config_file list
        """
        parser = argparse.ArgumentParser(
            description="DMCA Takedown Request Sender"
        )
        parser.add_argument(
            "request_config_file",
            nargs="+",
            help="One or more JSON config files containing DMCA request details"
        )
        return parser.parse_args()

    @staticmethod
    def format_processing_summary(stats: ProcessingStats) -> str:
        """
        Format a summary of processing results.
        Args:
            stats (ProcessingStats): Stats object with totals, successes, failures, errors
        Returns:
            str: Formatted summary
        """
        summary_lines: List[str] = []
        summary_lines.append("=== DMCA Processing Summary ===")
        summary_lines.append(f"Total requests: {stats.total}")
        summary_lines.append(f"Successful:     {stats.success}")
        summary_lines.append(f"Failed:         {stats.failed}")

        if stats.errors:
            summary_lines.append("\nErrors:")
            for err in stats.errors:
                summary_lines.append(f" - {err}")

        return "\n".join(summary_lines)

    @staticmethod
    def get_exit_code(stats: ProcessingStats) -> int:
        """
        Determine exit code based on stats.
        Args:
            stats (ProcessingStats): Stats object
        Returns:
            int: 0 if all succeeded, 1 if any failed
        """
        return 0 if stats.failed == 0 else 1
